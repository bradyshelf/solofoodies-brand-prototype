import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface PauseCollaborationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  collaborationTitle?: string;
}

export const PauseCollaborationDialog = ({ 
  open, 
  onOpenChange, 
  onConfirm,
  collaborationTitle 
}: PauseCollaborationDialogProps) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Pausar colaboración?</AlertDialogTitle>
          <AlertDialogDescription>
            {collaborationTitle ? (
              <>Esta acción pausará la colaboración "{collaborationTitle}". Los influencers no podrán aplicar mientras esté pausada, pero podrás reactivarla en cualquier momento.</>
            ) : (
              <>Esta acción pausará la colaboración. Los influencers no podrán aplicar mientras esté pausada, pero podrás reactivarla en cualquier momento.</>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction 
            onClick={onConfirm}
            className="bg-yellow-500 hover:bg-yellow-600 text-black"
          >
            Pausar colaboración
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};