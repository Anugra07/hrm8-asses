import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Eye, EyeOff, CheckCircle2, Shield, Users, BarChart3, UserPlus } from "lucide-react";
import { countryCodes } from "@/lib/constants";
import { toast } from "@/hooks/use-toast";
import logoLight from "@/assets/logo-light.png";
import logoDark from "@/assets/logo-dark.png";
import { apiClient } from "@/lib/api";

// Role descriptions for display
const roleDescriptions: Record<string, { label: string; description: string; icon: React.ReactNode }> = {
  admin: {
    label: "Admin",
    description: "Full access to all features, settings, and user management",
    icon: <Shield className="h-4 w-4" />
  },
  manager: {
    label: "Manager",
    description: "Manage candidates, assessments, and view all results",
    icon: <Users className="h-4 w-4" />
  },
  recruiter: {
    label: "Recruiter",
    description: "Add candidates, assign assessments, and view results",
    icon: <UserPlus className="h-4 w-4" />
  },
  viewer: {
    label: "Viewer",
    description: "View-only access to candidates and assessment results",
    icon: <BarChart3 className="h-4 w-4" />
  }
};

export default function AcceptInvitation() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  // Form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneCountryCode, setPhoneCountryCode] = useState("+61");
  const [positionTitle, setPositionTitle] = useState("");
  const [role, setRole] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isValidating, setIsValidating] = useState(true);
  const [isValid, setIsValid] = useState(false);

  // Validate token and load invitation data
  useEffect(() => {
    const validateToken = async () => {
      setIsValidating(true);

      if (!token) {
        setIsValid(false);
        setIsValidating(false);
        return;
      }

      try {
        const response = await apiClient.getAssessInvitation(token);
        if (!response.success || !response.data) {
          setIsValid(false);
          setIsValidating(false);
          return;
        }

        setFirstName(response.data.firstName || "");
        setLastName(response.data.lastName || "");
        setEmail(response.data.email || "");
        setPhone(response.data.phone || "");
        setPhoneCountryCode(response.data.phoneCountryCode || "+61");
        setPositionTitle(response.data.positionTitle || "");
        setRole(response.data.role || "recruiter");
        setCompanyName(response.data.companyName || "HRM8");
        setIsValid(true);
      } catch {
        setIsValid(false);
      }

      setIsValidating(false);
    };

    validateToken();
  }, [token]);

  // Password validation
  const passwordRequirements = [
    { label: "At least 8 characters", met: password.length >= 8 },
    { label: "Contains a number", met: /\d/.test(password) },
    { label: "Contains uppercase letter", met: /[A-Z]/.test(password) },
    { label: "Passwords match", met: password === confirmPassword && password.length > 0 }
  ];

  const allRequirementsMet = passwordRequirements.every(req => req.met);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!allRequirementsMet) {
      toast({
        title: "Invalid Password",
        description: "Please ensure all password requirements are met.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      if (!token) {
        throw new Error("Invitation token is missing");
      }

      const response = await apiClient.acceptAssessInvitation(token, {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        phone: phone.trim() || undefined,
        phoneCountryCode,
        positionTitle: positionTitle.trim() || undefined,
        password,
      });

      if (!response.success) {
        throw new Error(response.error || "Failed to accept invitation");
      }

      toast({
        title: "Account Activated!",
        description: `Welcome to ${companyName}, ${firstName}!`
      });

      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Could not activate invitation",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Loading state
  if (isValidating) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Validating your invitation...</p>
        </div>
      </div>
    );
  }

  // Invalid token state
  if (!isValid) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4">
              <img src={logoLight} alt="Logo" className="h-10 dark:hidden" />
              <img src={logoDark} alt="Logo" className="h-10 hidden dark:block" />
            </div>
            <CardTitle className="text-destructive">Invalid Invitation</CardTitle>
            <CardDescription>
              This invitation link is invalid or has expired. Please contact your administrator for a new invitation.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => navigate("/")}
            >
              Return to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const roleInfo = roleDescriptions[role] || roleDescriptions.recruiter;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto">
            <img src={logoLight} alt="Logo" className="h-10 dark:hidden" />
            <img src={logoDark} alt="Logo" className="h-10 hidden dark:block" />
          </div>
          <div>
            <CardTitle className="text-2xl">Welcome to {companyName}!</CardTitle>
            <CardDescription className="mt-2">
              You've been invited to join as a{" "}
              <Badge variant="secondary" className="ml-1">
                {roleInfo.icon}
                <span className="ml-1">{roleInfo.label}</span>
              </Badge>
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Information */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Your Profile
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  disabled
                  className="bg-muted"
                />
                <p className="text-xs text-muted-foreground">
                  Your email address cannot be changed
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number (Optional)</Label>
                <div className="flex gap-2">
                  <Select value={phoneCountryCode} onValueChange={setPhoneCountryCode}>
                    <SelectTrigger className="w-[120px]">
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
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="4 1234 5678"
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="positionTitle">Position Title</Label>
                <Input
                  id="positionTitle"
                  value={positionTitle}
                  onChange={(e) => setPositionTitle(e.target.value)}
                  placeholder="e.g. HR Manager"
                />
              </div>
            </div>

            {/* Password Section */}
            <div className="space-y-4 pt-4 border-t">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Create Your Password
              </h3>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Password Requirements */}
              <div className="space-y-2">
                {passwordRequirements.map((req, index) => (
                  <div 
                    key={index}
                    className={`flex items-center gap-2 text-sm ${
                      req.met ? "text-green-600 dark:text-green-400" : "text-muted-foreground"
                    }`}
                  >
                    <CheckCircle2 className={`h-4 w-4 ${req.met ? "opacity-100" : "opacity-30"}`} />
                    {req.label}
                  </div>
                ))}
              </div>
            </div>

            {/* Role Display */}
            <div className="p-4 bg-muted/50 rounded-lg space-y-2">
              <div className="flex items-center gap-2">
                {roleInfo.icon}
                <span className="font-medium">Your Role: {roleInfo.label}</span>
              </div>
              <p className="text-sm text-muted-foreground">{roleInfo.description}</p>
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full" 
              size="lg"
              disabled={!allRequirementsMet || isLoading}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Activating Account...
                </>
              ) : (
                "Activate Account"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
