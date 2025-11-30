'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Share2, Copy, Mail, Check, Link2, Users } from 'lucide-react';
import { SuccessAlert } from '@/components/accessibility';

type Permission = 'view' | 'comment' | 'edit';

interface Collaborator {
  id: string;
  email: string;
  name: string;
  permission: Permission;
  avatar?: string;
}

export function ShareDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [permission, setPermission] = useState<Permission>('edit');
  const [linkCopied, setLinkCopied] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  
  // Mock collaborators - in production, this would come from your database
  const [collaborators, setCollaborators] = useState<Collaborator[]>([
    {
      id: '1',
      email: 'john@example.com',
      name: 'John Doe',
      permission: 'edit',
    },
    {
      id: '2',
      email: 'jane@example.com',
      name: 'Jane Smith',
      permission: 'comment',
    },
  ]);

  const handleInvite = () => {
    if (!email) return;
    
    // In production, this would send an invitation email
    const newCollaborator: Collaborator = {
      id: Date.now().toString(),
      email,
      name: email.split('@')[0],
      permission,
    };
    
    setCollaborators([...collaborators, newCollaborator]);
    setEmail('');
    setEmailSent(true);
    setTimeout(() => setEmailSent(false), 3000);
  };

  const handleCopyLink = () => {
    // In production, this would generate a shareable link
    const link = window.location.href;
    navigator.clipboard.writeText(link);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const updatePermission = (collaboratorId: string, newPermission: Permission) => {
    setCollaborators(collaborators.map(c => 
      c.id === collaboratorId ? { ...c, permission: newPermission } : c
    ));
  };

  const removeCollaborator = (collaboratorId: string) => {
    setCollaborators(collaborators.filter(c => c.id !== collaboratorId));
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2" aria-label="Share document">
          <Share2 className="w-4 h-4" aria-hidden="true" />
          <span className="hidden sm:inline">Share</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="w-5 h-5" />
            Share Document
          </DialogTitle>
          <DialogDescription>
            Invite people to collaborate on this document
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Invite by email */}
          <div className="space-y-3">
            <Label htmlFor="email" className="text-sm font-medium">
              Invite by email
            </Label>
            <div className="flex gap-2">
              <Input
                id="email"
                type="email"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleInvite()}
                className="flex-1"
                aria-label="Email address for invitation"
              />
              <Select value={permission} onValueChange={(val) => setPermission(val as Permission)}>
                <SelectTrigger className="w-32" aria-label="Select permission level">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="view">View</SelectItem>
                  <SelectItem value="comment">Comment</SelectItem>
                  <SelectItem value="edit">Edit</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleInvite} disabled={!email} aria-label="Send invitation">
                <Mail className="w-4 h-4 mr-2" />
                Invite
              </Button>
            </div>
            {emailSent && (
              <SuccessAlert message="Invitation sent successfully!" />
            )}
          </div>

          {/* Share link */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Share link</Label>
            <div className="flex gap-2">
              <Input
                readOnly
                value={typeof window !== 'undefined' ? window.location.href : ''}
                className="flex-1"
                aria-label="Shareable document link"
              />
              <Button 
                variant="outline" 
                onClick={handleCopyLink}
                className="gap-2"
                aria-label="Copy share link to clipboard"
              >
                {linkCopied ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Current collaborators */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <Label className="text-sm font-medium">
                People with access ({collaborators.length})
              </Label>
            </div>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {collaborators.map((collaborator) => (
                <div
                  key={collaborator.id}
                  className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-semibold">
                      {collaborator.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{collaborator.name}</p>
                      <p className="text-xs text-gray-500">{collaborator.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select
                      value={collaborator.permission}
                      onValueChange={(val) => updatePermission(collaborator.id, val as Permission)}
                    >
                      <SelectTrigger className="w-28" aria-label={`Change permission for ${collaborator.name}`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="view">View</SelectItem>
                        <SelectItem value="comment">Comment</SelectItem>
                        <SelectItem value="edit">Edit</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeCollaborator(collaborator.id)}
                      aria-label={`Remove ${collaborator.name} from collaborators`}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-start gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-sm text-blue-800 dark:text-blue-200">
            <Link2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <p>
              <strong>Note:</strong> Anyone with the link can access this document based on the permissions you set. Changes are synced in real-time.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
