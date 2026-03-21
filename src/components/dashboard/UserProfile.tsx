import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  User, 
  Mail, 
  Phone, 
  Briefcase, 
  Camera, 
  Shield, 
  Bell,
  Eye,
  EyeOff,
  CheckCircle2,
  Monitor,
  Smartphone,
  LogOut,
  Calendar,
  MapPin,
  AlertCircle
} from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { countryCodes } from '@/lib/constants';
import { ProfileSubTab } from '@/types/assessment';

interface CurrentUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneCountryCode?: string;
  phone?: string;
  positionTitle?: string;
  role: 'admin' | 'manager' | 'recruiter' | 'viewer';
  avatarUrl?: string;
  joinedAt?: Date;
  lastActiveAt?: Date;
}

interface UserProfileProps {
  user: CurrentUser;
  onUpdateUser: (updates: Partial<CurrentUser>) => void;
  subTab: ProfileSubTab;
  setSubTab: (tab: ProfileSubTab) => void;
}

// Mock active sessions data
const mockSessions = [
  {
    id: '1',
    device: 'Chrome on MacOS',
    icon: Monitor,
    location: 'Sydney, Australia',
    lastActive: new Date(),
    isCurrent: true,
  },
  {
    id: '2',
    device: 'Safari on iPhone',
    icon: Smartphone,
    location: 'Melbourne, Australia',
    lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    isCurrent: false,
  },
];

// Password requirements
const passwordRequirements = [
  { id: 'length', label: 'At least 8 characters', test: (p: string) => p.length >= 8 },
  { id: 'uppercase', label: 'One uppercase letter', test: (p: string) => /[A-Z]/.test(p) },
  { id: 'lowercase', label: 'One lowercase letter', test: (p: string) => /[a-z]/.test(p) },
  { id: 'number', label: 'One number', test: (p: string) => /\d/.test(p) },
];

export const UserProfile = ({ user, onUpdateUser, subTab, setSubTab }: UserProfileProps) => {
  // Personal info state
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [phone, setPhone] = useState(user.phone || '');
  const [phoneCountryCode, setPhoneCountryCode] = useState(user.phoneCountryCode || '+61');
  const [positionTitle, setPositionTitle] = useState(user.positionTitle || '');
  const [isPersonalDirty, setIsPersonalDirty] = useState(false);

  // Password state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Notification preferences state
  const [notifications, setNotifications] = useState({
    assessmentCompleted: true,
    candidateReminders: true,
    weeklySummary: false,
    systemAnnouncements: true,
    inAppAssessmentCompleted: true,
    inAppCandidateReminders: true,
    inAppSystemAnnouncements: true,
  });

  const handlePersonalChange = () => {
    setIsPersonalDirty(true);
  };

  const handleSavePersonal = () => {
    onUpdateUser({
      firstName,
      lastName,
      phone: phone.trim() || undefined,
      phoneCountryCode: phone.trim() ? phoneCountryCode : undefined,
      positionTitle: positionTitle.trim() || undefined,
    });
    setIsPersonalDirty(false);
    toast.success('Profile updated successfully');
  };

  const handleChangePassword = () => {
    // Validate
    if (!currentPassword) {
      toast.error('Please enter your current password');
      return;
    }
    if (!passwordRequirements.every(req => req.test(newPassword))) {
      toast.error('New password does not meet requirements');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    // Mock password change
    toast.success('Password changed successfully');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleSignOutAllSessions = () => {
    toast.success('Signed out of all other sessions');
  };

  const handleNotificationChange = (key: keyof typeof notifications, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
    toast.success('Notification preferences updated');
  };

  const getRoleLabel = (role: string) => {
    const labels: Record<string, string> = {
      admin: 'Administrator',
      manager: 'Manager',
      recruiter: 'Recruiter',
      viewer: 'Viewer',
    };
    return labels[role] || role;
  };

  return (
    <div className="space-y-6">
      <Tabs value={subTab} onValueChange={(v) => setSubTab(v as ProfileSubTab)}>
        <TabsList className="bg-muted">
          <TabsTrigger value="personal" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Personal Info
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
        </TabsList>

        {/* Personal Information Tab */}
        <TabsContent value="personal" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Photo Card */}
            <div className="bg-card rounded-xl border border-border p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Profile Photo</h3>
              
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-semibold">
                    {user.avatarUrl ? (
                      <img 
                        src={user.avatarUrl} 
                        alt="Profile" 
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      `${firstName[0] || ''}${lastName[0] || ''}`
                    )}
                  </div>
                  <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors">
                    <Camera className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="space-y-2 w-full">
                  <Button variant="outline" size="sm" className="w-full">
                    Upload Photo
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full text-muted-foreground">
                    Remove
                  </Button>
                </div>
                
                <div className="mt-6 pt-6 border-t border-border w-full space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Joined {user.joinedAt ? format(user.joinedAt, 'MMM d, yyyy') : 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    <span>{getRoleLabel(user.role)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Personal Details Card */}
            <div className="lg:col-span-2 bg-card rounded-xl border border-border p-6">
              <h3 className="text-lg font-semibold text-foreground mb-6">Personal Details</h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input 
                      id="firstName"
                      value={firstName}
                      onChange={(e) => { setFirstName(e.target.value); handlePersonalChange(); }}
                      placeholder="Enter first name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input 
                      id="lastName"
                      value={lastName}
                      onChange={(e) => { setLastName(e.target.value); handlePersonalChange(); }}
                      placeholder="Enter last name"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="email"
                      value={user.email}
                      disabled
                      className="pl-10 bg-muted"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-success text-xs">
                      <CheckCircle2 className="h-3 w-3" />
                      Verified
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Contact your administrator to change your email address
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="flex gap-2">
                    <Select value={phoneCountryCode} onValueChange={(v) => { setPhoneCountryCode(v); handlePersonalChange(); }}>
                      <SelectTrigger className="w-28">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {countryCodes.map((cc) => (
                          <SelectItem key={cc.code} value={cc.code}>
                            {cc.flag} {cc.code}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className="relative flex-1">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="phone"
                        value={phone}
                        onChange={(e) => { setPhone(e.target.value); handlePersonalChange(); }}
                        placeholder="400 000 000"
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="positionTitle">Position Title</Label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="positionTitle"
                      value={positionTitle}
                      onChange={(e) => { setPositionTitle(e.target.value); handlePersonalChange(); }}
                      placeholder="e.g. HR Manager"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-border flex justify-end">
                  <Button 
                    variant="hero" 
                    onClick={handleSavePersonal}
                    disabled={!isPersonalDirty || !firstName.trim() || !lastName.trim()}
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Change Password Card */}
            <div className="bg-card rounded-xl border border-border p-6">
              <h3 className="text-lg font-semibold text-foreground mb-2">Change Password</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Update your password to keep your account secure
              </p>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <div className="relative">
                    <Input 
                      id="currentPassword"
                      type={showCurrentPassword ? 'text' : 'password'}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Enter current password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <div className="relative">
                    <Input 
                      id="newPassword"
                      type={showNewPassword ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  
                  {/* Password Requirements */}
                  <div className="mt-3 space-y-1.5">
                    {passwordRequirements.map(req => (
                      <div 
                        key={req.id}
                        className={`flex items-center gap-2 text-xs ${
                          req.test(newPassword) ? 'text-success' : 'text-muted-foreground'
                        }`}
                      >
                        <CheckCircle2 className="h-3 w-3" />
                        {req.label}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <div className="relative">
                    <Input 
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {confirmPassword && newPassword !== confirmPassword && (
                    <p className="text-xs text-destructive flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      Passwords do not match
                    </p>
                  )}
                </div>

                <Button 
                  variant="hero" 
                  onClick={handleChangePassword}
                  disabled={!currentPassword || !newPassword || !confirmPassword || newPassword !== confirmPassword}
                  className="w-full"
                >
                  Update Password
                </Button>
              </div>
            </div>

            {/* Active Sessions Card */}
            <div className="bg-card rounded-xl border border-border p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-foreground">Active Sessions</h3>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={handleSignOutAllSessions}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign out all
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mb-6">
                Manage devices where you're currently signed in
              </p>
              
              <div className="space-y-4">
                {mockSessions.map(session => {
                  const Icon = session.icon;
                  return (
                    <div 
                      key={session.id}
                      className={`flex items-start gap-3 p-3 rounded-lg ${
                        session.isCurrent ? 'bg-primary/5 border border-primary/20' : 'bg-muted'
                      }`}
                    >
                      <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center">
                        <Icon className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-foreground">{session.device}</p>
                          {session.isCurrent && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                              Current
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {session.location}
                          </span>
                          <span>
                            {session.isCurrent ? 'Active now' : format(session.lastActive, "'Last active' MMM d, h:mm a")}
                          </span>
                        </div>
                      </div>
                      {!session.isCurrent && (
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive">
                          <LogOut className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* 2FA Section */}
              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-foreground flex items-center gap-2">
                      Two-Factor Authentication
                      <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                        Coming Soon
                      </span>
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Switch disabled />
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Email Notifications Card */}
            <div className="bg-card rounded-xl border border-border p-6">
              <div className="flex items-center gap-2 mb-2">
                <Mail className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">Email Notifications</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-6">
                Choose which emails you want to receive
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">Assessment Completed</p>
                    <p className="text-sm text-muted-foreground">Get notified when a candidate completes an assessment</p>
                  </div>
                  <Switch 
                    checked={notifications.assessmentCompleted}
                    onCheckedChange={(v) => handleNotificationChange('assessmentCompleted', v)}
                  />
                </div>
                
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">Candidate Reminders</p>
                    <p className="text-sm text-muted-foreground">Reminders for pending candidate invitations</p>
                  </div>
                  <Switch 
                    checked={notifications.candidateReminders}
                    onCheckedChange={(v) => handleNotificationChange('candidateReminders', v)}
                  />
                </div>
                
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">Weekly Summary</p>
                    <p className="text-sm text-muted-foreground">Weekly digest of assessment activity</p>
                  </div>
                  <Switch 
                    checked={notifications.weeklySummary}
                    onCheckedChange={(v) => handleNotificationChange('weeklySummary', v)}
                  />
                </div>
                
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">System Announcements</p>
                    <p className="text-sm text-muted-foreground">Important updates about new features and changes</p>
                  </div>
                  <Switch 
                    checked={notifications.systemAnnouncements}
                    onCheckedChange={(v) => handleNotificationChange('systemAnnouncements', v)}
                  />
                </div>
              </div>
            </div>

            {/* In-App Notifications Card */}
            <div className="bg-card rounded-xl border border-border p-6">
              <div className="flex items-center gap-2 mb-2">
                <Bell className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">In-App Notifications</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-6">
                Choose which notifications appear in the app
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">Assessment Completed</p>
                    <p className="text-sm text-muted-foreground">Show notification when assessments are completed</p>
                  </div>
                  <Switch 
                    checked={notifications.inAppAssessmentCompleted}
                    onCheckedChange={(v) => handleNotificationChange('inAppAssessmentCompleted', v)}
                  />
                </div>
                
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">Candidate Activity</p>
                    <p className="text-sm text-muted-foreground">Updates on candidate progress and status changes</p>
                  </div>
                  <Switch 
                    checked={notifications.inAppCandidateReminders}
                    onCheckedChange={(v) => handleNotificationChange('inAppCandidateReminders', v)}
                  />
                </div>
                
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">System Announcements</p>
                    <p className="text-sm text-muted-foreground">Important platform updates and new features</p>
                  </div>
                  <Switch 
                    checked={notifications.inAppSystemAnnouncements}
                    onCheckedChange={(v) => handleNotificationChange('inAppSystemAnnouncements', v)}
                  />
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserProfile;
