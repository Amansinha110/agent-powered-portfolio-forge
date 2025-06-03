
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface AuthenticationFormProps {
  onLogin: (authenticated: boolean) => void;
  onRoleChange: (role: 'admin' | 'doctor' | 'nurse') => void;
}

const AuthenticationForm: React.FC<AuthenticationFormProps> = ({ onLogin, onRoleChange }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '', role: 'admin' as 'admin' | 'doctor' | 'nurse' });
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    // Simulate authentication
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes, accept any credentials
    if (credentials.username && credentials.password) {
      onRoleChange(credentials.role);
      onLogin(true);
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Hospital Management System</CardTitle>
          <CardDescription>Secure access to healthcare management</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              placeholder="Enter your username"
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select value={credentials.role} onValueChange={(value: 'admin' | 'doctor' | 'nurse') => setCredentials({ ...credentials, role: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Administrator</SelectItem>
                <SelectItem value="doctor">Doctor</SelectItem>
                <SelectItem value="nurse">Nurse</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button 
            className="w-full" 
            onClick={handleLogin}
            disabled={isLoading || !credentials.username || !credentials.password}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </Button>

          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Demo Credentials:</p>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span>Username:</span>
                <Badge variant="outline">any</Badge>
              </div>
              <div className="flex justify-between">
                <span>Password:</span>
                <Badge variant="outline">any</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthenticationForm;
