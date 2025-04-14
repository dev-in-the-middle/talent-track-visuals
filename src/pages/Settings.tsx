
import MainLayout from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

const Settings = () => {
  return (
    <MainLayout title="Settings">
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="company">Company Name</Label>
                <Input id="company" defaultValue="TalentTrack" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Time Zone</Label>
                <select 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2"
                  id="timezone"
                  defaultValue="UTC-7"
                >
                  <option value="UTC-12">UTC-12</option>
                  <option value="UTC-11">UTC-11</option>
                  <option value="UTC-10">UTC-10</option>
                  <option value="UTC-9">UTC-9</option>
                  <option value="UTC-8">UTC-8</option>
                  <option value="UTC-7">UTC-7 (Pacific)</option>
                  <option value="UTC-6">UTC-6 (Mountain)</option>
                  <option value="UTC-5">UTC-5 (Central)</option>
                  <option value="UTC-4">UTC-4 (Eastern)</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="dark-mode">Dark Mode</Label>
                  <div className="text-sm text-muted-foreground">
                    Enable dark mode for the interface
                  </div>
                </div>
                <Switch id="dark-mode" />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" defaultValue="admin@talenttrack.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Change Password</Label>
                <Input id="password" type="password" />
              </div>
              <Button>Update Account</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { id: "new-applications", label: "New Applications", description: "Notify when new candidates apply" },
                  { id: "interview-reminders", label: "Interview Reminders", description: "Send reminders for upcoming interviews" },
                  { id: "hiring-updates", label: "Hiring Updates", description: "Updates on candidate status changes" },
                  { id: "system-notices", label: "System Notices", description: "Important system and security updates" }
                ].map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor={item.id}>{item.label}</Label>
                      <div className="text-sm text-muted-foreground">
                        {item.description}
                      </div>
                    </div>
                    <Switch id={item.id} defaultChecked={item.id !== "system-notices"} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations">
          <Card>
            <CardHeader>
              <CardTitle>Integrations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { name: "Calendar", status: "Connected" },
                { name: "Email Provider", status: "Not connected" },
                { name: "Job Boards", status: "Not connected" },
                { name: "HRIS System", status: "Not connected" }
              ].map((integration, index) => (
                <div key={index} className="flex justify-between items-center pb-4 border-b">
                  <div>
                    <h3 className="font-medium">{integration.name}</h3>
                    <p className={`text-sm ${integration.status === "Connected" ? "text-green-600" : "text-gray-500"}`}>
                      {integration.status}
                    </p>
                  </div>
                  <Button variant={integration.status === "Connected" ? "outline" : "default"}>
                    {integration.status === "Connected" ? "Manage" : "Connect"}
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default Settings;
