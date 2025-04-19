
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/common/Navbar";

const groupFormSchema = z.object({
  name: z.string().min(3, { message: "Group name must be at least 3 characters" }),
  description: z.string().optional(),
  coverImage: z.string().optional(),
});

type GroupFormValues = z.infer<typeof groupFormSchema>;

const CreateGroup = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const form = useForm<GroupFormValues>({
    resolver: zodResolver(groupFormSchema),
    defaultValues: {
      name: "",
      description: "",
      coverImage: "",
    },
  });

  const onSubmit = async (data: GroupFormValues) => {
    setIsSubmitting(true);
    try {
      // Get the current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("User not authenticated");
      }

      console.log("Creating group with data:", {
        name: data.name,
        description: data.description || "",
        cover_image: data.coverImage || null,
        created_by: user.id,
      });

      // Insert the group into the database
      const { data: groupData, error } = await supabase
        .from("groups")
        .insert([{
          name: data.name,
          description: data.description || "",
          cover_image: data.coverImage || null,
          created_by: user.id,
        }])
        .select()
        .single();

      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }

      // Create a group membership for the creator
      if (groupData) {
        const { error: membershipError } = await supabase
          .from("group_members")
          .insert([{
            group_id: groupData.id,
            user_id: user.id,
            role: 'organizer',
          }]);

        if (membershipError) {
          console.error("Membership error:", membershipError);
          throw membershipError;
        }
      }

      toast({
        title: "Group created!",
        description: "Your new group has been created successfully.",
      });

      // Redirect to the groups page
      navigate("/groups");
    } catch (error: any) {
      console.error("Error creating group:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to create group. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <Users className="h-6 w-6 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Create a New Group</h1>
            </div>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Group Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Himalayan Trekkers" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description (optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell us about your group..." 
                          className="resize-none" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="coverImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cover Image URL (optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com/image.jpg" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex justify-end space-x-3 pt-4">
                  <Button 
                    variant="outline" 
                    type="button"
                    onClick={() => navigate("/groups")}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Creating..." : "Create Group"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateGroup;
