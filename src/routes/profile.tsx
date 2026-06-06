import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useStore } from "@/lib/store";
import { useState } from "react";
import { toast } from "sonner";
import {
  User, Mail, Shield, Building2, Phone, MapPin, Calendar, Hash,
  Lock, KeyRound, Bell, Globe, Clock, FileText, ShoppingCart,
  Receipt, CheckCircle2, Camera, Pencil, Save, Activity, Laptop,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profile — VendorB" }] }),
  component: ProfilePage,
});

function ProfilePage() {
  const { user, activity, rfqs, pos, invoices, notifications } = useStore();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState("+91 98765 43210");
  const [department, setDepartment] = useState("Procurement");
  const [location, setLocation] = useState("Mumbai, India");
  const [isEditing, setIsEditing] = useState(false);

  const [emailNotifs, setEmailNotifs] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(true);
  const [smsNotifs, setSmsNotifs] = useState(false);

  const initials = user?.name.split(" ").map((s) => s[0]).join("").slice(0, 2) || "?";
  const userActivity = activity.filter((a) => a.user === user?.name);

  const statsData = [
    { label: "RFQs Created", value: rfqs.filter((r) => r.createdBy === user?.id).length, icon: FileText, color: "text-blue-500 bg-blue-50 dark:bg-blue-950/40" },
    { label: "POs Managed", value: pos.length, icon: ShoppingCart, color: "text-amber-500 bg-amber-50 dark:bg-amber-950/40" },
    { label: "Invoices", value: invoices.length, icon: Receipt, color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40" },
    { label: "Notifications", value: notifications.length, icon: Bell, color: "text-violet-500 bg-violet-50 dark:bg-violet-950/40" },
  ];

  const handleSave = () => {
    setIsEditing(false);
    toast.success("Profile updated successfully");
  };

  return (
    <div>
      <PageHeader title="Your Profile" description="Manage your account, preferences, and security settings." />

      {/* Hero Card */}
      <Card className="mb-6 overflow-hidden p-0">
        {/* Banner */}
        <div className="relative h-32 w-full overflow-hidden bg-[#0d4f4a] sm:h-36">
          {/* Grid lines */}
          <svg
            className="absolute inset-0 h-full w-full opacity-[0.12]"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            {/* Horizontal lines */}
            {[25, 50, 75].map((y) => (
              <line key={y} x1="0" y1={`${y}%`} x2="100%" y2={`${y}%`} stroke="white" strokeWidth="0.5" />
            ))}
            {/* Vertical lines */}
            {[14, 28, 42, 56, 70, 84].map((x) => (
              <line key={x} x1={`${x}%`} y1="0" x2={`${x}%`} y2="100%" stroke="white" strokeWidth="0.5" />
            ))}
            {/* Geometric accents */}
            <circle cx="14%" cy="50%" r="32" fill="none" stroke="white" strokeWidth="0.5" opacity="0.5" />
            <circle cx="56%" cy="25%" r="18" fill="none" stroke="white" strokeWidth="0.5" opacity="0.4" />
            <circle cx="84%" cy="75%" r="26" fill="none" stroke="white" strokeWidth="0.5" opacity="0.45" />
            <rect x="62%" y="20%" width="44" height="44" fill="none" stroke="white" strokeWidth="0.5" opacity="0.3" />
            <rect x="28%" y="55%" width="30" height="30" fill="none" stroke="white" strokeWidth="0.5" opacity="0.25" />
          </svg>

          {/* Monospace metadata — top right */}
          <div className="absolute right-5 top-1/2 -translate-y-1/2 hidden sm:block text-right font-mono text-[10px] leading-[1.9] text-white/30 select-none">
            <div>vendor_id: VB-0012</div>
            <div>role: {user?.role?.toLowerCase() || "administrator"}</div>
            <div>joined: 2025-01-15</div>
            <div>status: active</div>
          </div>
        </div>

        {/* Profile row */}
        <CardContent className="px-6 pb-5 pt-0">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-5">
            {/* Avatar — overlaps banner */}
            <div className="relative group shrink-0 -mt-10 sm:-mt-11">
              <Avatar className="h-20 w-20 border-[3px] border-card shadow-md sm:h-[88px] sm:w-[88px]">
                <AvatarFallback className="bg-emerald-200 text-emerald-900 text-xl font-semibold sm:text-2xl">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <button
                className="absolute bottom-0.5 right-0.5 grid h-6 w-6 place-items-center rounded-full bg-card border border-border shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Change avatar"
              >
                <Camera className="h-3 w-3 text-muted-foreground" />
              </button>
            </div>

            {/* Name / meta */}
            <div className="flex-1 min-w-0 pt-1 pb-0.5">
              <h2 className="text-lg font-semibold text-foreground sm:text-xl">{user?.name}</h2>
              <p className="text-sm text-muted-foreground mt-0.5">{user?.email}</p>
              <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm text-muted-foreground">
                <Badge variant="secondary" className="gap-1 text-xs font-medium">
                  <Shield className="h-3 w-3" />
                  {user?.role}
                </Badge>
                <span className="flex items-center gap-1.5">
                  <Building2 className="h-3.5 w-3.5 shrink-0" />
                  {department}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 shrink-0" />
                  {location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 shrink-0" />
                  IST (UTC+5:30)
                </span>
              </div>
            </div>

            {/* Edit button */}
            <Button
              variant={isEditing ? "default" : "outline"}
              size="sm"
              className="gap-1.5 self-start sm:self-end shrink-0"
              onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
            >
              {isEditing ? (
                <><Save className="h-3.5 w-3.5" /> Save Changes</>
              ) : (
                <><Pencil className="h-3.5 w-3.5" /> Edit Profile</>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats Row */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {statsData.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="flex items-center gap-3 p-4">
              <div className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${stat.color}`}>
                <stat.icon className="h-4.5 w-4.5" />
              </div>
              <div>
                <div className="text-xl font-semibold tabular-nums">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left — Account + Security */}
        <div className="space-y-6 lg:col-span-2">
          {/* Account Information */}
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2.5">
                <div className="grid h-8 w-8 place-items-center rounded-lg bg-muted">
                  <User className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <CardTitle className="text-base">Account Information</CardTitle>
                  <CardDescription className="text-xs">Your personal and professional details</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { label: "Full Name", icon: User, value: name, onChange: setName, type: "text" },
                  { label: "Email Address", icon: Mail, value: email, onChange: setEmail, type: "email" },
                  { label: "Phone Number", icon: Phone, value: phone, onChange: setPhone, type: "tel" },
                  { label: "Department", icon: Building2, value: department, onChange: setDepartment, type: "text" },
                  { label: "Location", icon: MapPin, value: location, onChange: setLocation, type: "text" },
                  { label: "Role", icon: Shield, value: user?.role || "", onChange: () => { }, type: "text", readOnly: true },
                ].map(({ label, icon: Icon, value, onChange, type, readOnly }) => (
                  <div key={label} className="space-y-1.5">
                    <Label className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      <Icon className="h-3 w-3" /> {label}
                    </Label>
                    <Input
                      type={type}
                      value={value}
                      onChange={(e) => onChange(e.target.value)}
                      disabled={!isEditing || readOnly}
                      className="disabled:opacity-60 h-9 text-sm"
                    />
                  </div>
                ))}
              </div>

              <Separator />

              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  { label: "Employee ID", icon: Hash, value: user?.id.toUpperCase() || "", mono: true },
                  { label: "Date Joined", icon: Calendar, value: "January 15, 2025" },
                  { label: "Timezone", icon: Clock, value: "Asia/Kolkata (IST)" },
                ].map(({ label, icon: Icon, value, mono }) => (
                  <div key={label} className="space-y-1.5">
                    <Label className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      <Icon className="h-3 w-3" /> {label}
                    </Label>
                    <Input
                      value={value}
                      disabled
                      className={`disabled:opacity-60 h-9 text-sm ${mono ? "font-mono text-xs" : ""}`}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Security */}
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2.5">
                <div className="grid h-8 w-8 place-items-center rounded-lg bg-muted">
                  <Lock className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <CardTitle className="text-base">Security</CardTitle>
                  <CardDescription className="text-xs">Manage your password and authentication settings</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="divide-y divide-border">
              {/* Password */}
              <div className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-lg bg-muted">
                    <KeyRound className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Password</div>
                    <div className="text-xs text-muted-foreground">Last changed 30 days ago</div>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={() => toast.info("Password change dialog (demo)")}>
                  Change
                </Button>
              </div>

              {/* 2FA */}
              <div className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-lg bg-muted">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Two-Factor Authentication</div>
                    <div className="text-xs text-muted-foreground">Add an extra layer of security</div>
                  </div>
                </div>
                <Switch
                  onCheckedChange={(checked) =>
                    toast.success(checked ? "2FA enabled (demo)" : "2FA disabled (demo)")
                  }
                />
              </div>

              {/* Sessions */}
              <div className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-lg bg-muted">
                    <Laptop className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Active Sessions</div>
                    <div className="text-xs text-muted-foreground">1 active session — this device</div>
                  </div>
                </div>
                <Badge variant="secondary" className="text-xs gap-1">
                  <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                  Current
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right — Preferences + Activity */}
        <div className="space-y-6">
          {/* Notifications */}
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2.5">
                <div className="grid h-8 w-8 place-items-center rounded-lg bg-muted">
                  <Bell className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <CardTitle className="text-base">Notifications</CardTitle>
                  <CardDescription className="text-xs">Choose how you receive alerts</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="divide-y divide-border">
              {[
                { label: "Email", sub: "Receive alerts via email", checked: emailNotifs, set: setEmailNotifs },
                { label: "Push", sub: "Browser push notifications", checked: pushNotifs, set: setPushNotifs },
                { label: "SMS", sub: "Critical alerts via SMS", checked: smsNotifs, set: setSmsNotifs },
              ].map(({ label, sub, checked, set }) => (
                <div key={label} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                  <div>
                    <div className="text-sm font-medium">{label}</div>
                    <div className="text-xs text-muted-foreground">{sub}</div>
                  </div>
                  <Switch checked={checked} onCheckedChange={set} />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Display Preferences */}
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2.5">
                <div className="grid h-8 w-8 place-items-center rounded-lg bg-muted">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <CardTitle className="text-base">Display</CardTitle>
                  <CardDescription className="text-xs">Customize your experience</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                { label: "Language", value: "English (US)" },
                { label: "Currency", value: "INR (₹)" },
                { label: "Date Format", value: "DD/MM/YYYY" },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="flex items-center justify-between rounded-md bg-muted/40 px-3 py-2.5 text-sm"
                >
                  <span className="text-muted-foreground">{label}</span>
                  <span className="font-medium">{value}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2.5">
                <div className="grid h-8 w-8 place-items-center rounded-lg bg-muted">
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <CardTitle className="text-base">Recent Activity</CardTitle>
                  <CardDescription className="text-xs">Your latest actions</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="divide-y divide-border">
              {userActivity.slice(0, 8).map((a) => (
                <div key={a.id} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
                  <span className="mt-[5px] h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium truncate">{a.action}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {a.module} · {formatDistanceToNow(new Date(a.createdAt), { addSuffix: true })}
                    </div>
                  </div>
                </div>
              ))}
              {userActivity.length === 0 && (
                <div className="py-8 text-center text-muted-foreground">
                  <Activity className="mx-auto mb-2 h-5 w-5 opacity-30" />
                  <p className="text-xs">No activity yet.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}