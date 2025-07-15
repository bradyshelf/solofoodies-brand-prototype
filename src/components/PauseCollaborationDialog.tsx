import React from 'react';
import { Pause } from 'lucide-react';
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
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">Pausar colaboración</AlertDialogTitle>
          
          {/* Yellow pause icon */}
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center">
              <Pause className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <AlertDialogDescription className="text-center text-lg font-medium text-gray-900 mb-4">
            ¿Pausar esta colaboración?
          </AlertDialogDescription>
          
          {/* Information box */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 space-y-2">
            <div className="flex items-start space-x-2">
              <span className="text-yellow-600 mt-1">•</span>
              <span className="text-sm text-gray-700">Los foodies no podrán ver esta colaboración en su página de explorar</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-yellow-600 mt-1">•</span>
              <span className="text-sm text-gray-700">No se recibirán más solicitudes de participación</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-yellow-600 mt-1">•</span>
              <span className="text-sm text-gray-700">La colaboración se puede reactivar en cualquier momento</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-yellow-600 mt-1">•</span>
              <span className="text-sm text-gray-700">Es diferente a eliminar porque se conservan todos los datos</span>
            </div>
          </div>
        </AlertDialogHeader>
        
        <AlertDialogFooter className="flex space-x-3">
          <AlertDialogCancel className="flex-1">Cancelar</AlertDialogCancel>
          <AlertDialogAction 
            onClick={onConfirm}
            className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black"
          >
            Pausar colaboración
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};