import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import {updateProfile,changePassword,} from "../../services/profileService";

export function ProfileForm() {
  const { user, setUser } = useAuth();
  
  const [formData, setFormData] = useState({
    name: user?.fullName || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (
      formData.newPassword &&
      formData.newPassword !== formData.confirmPassword
    ) {
      toast.error("Passwords do not match");
      return;
    }

  try {

    // Update name
    const response = await updateProfile(formData.name);

    const updatedUser = {
      ...user,
      fullName: response.user.full_name,
    };

    localStorage.setItem(
      "user",
      JSON.stringify(updatedUser)
    );

    setUser(updatedUser);

    // Change password only if user entered one
    if (
      formData.currentPassword &&
      formData.newPassword
    ) {
      await changePassword(
        formData.currentPassword,
        formData.newPassword
      );

      toast.success("Password changed successfully");
    } else {
      toast.success("Profile updated successfully");
    }

    setFormData((prev) => ({
      ...prev,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    }));

} catch (error) {

  console.error(error);

  toast.error(
    error.response?.data?.message ||
    "Failed to update profile"
  );

}
};

  return (
    <Card title="Personal Information" padding="lg">
      <form onSubmit={handleSave} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input 
            label="Full Name" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
          />
          <Input 
            label="Email Address" 
            name="email" 
            value={user?.email || ''} 
            disabled 
            readOnly 
          />
        </div>
        
        <div className="border-t border-slate-200 pt-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Change Password</h3>
          <div className="space-y-4 max-w-md">
            <Input 
              type="password" 
              label="Current Password" 
              name="currentPassword" 
              value={formData.currentPassword} 
              onChange={handleChange} 
            />
            <Input 
              type="password" 
              label="New Password" 
              name="newPassword" 
              value={formData.newPassword} 
              onChange={handleChange} 
            />
            <Input 
              type="password" 
              label="Confirm New Password" 
              name="confirmPassword" 
              value={formData.confirmPassword} 
              onChange={handleChange} 
            />
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button type="submit" variant="primary">Save Changes</Button>
        </div>
      </form>
    </Card>
  );
}
