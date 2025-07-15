import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Camera, Edit3, Trash2, Upload } from 'lucide-react';

interface CollaborationPhotoUploadProps {
  value?: string;
  onChange?: (imageUrl: string | null) => void;
  className?: string;
}

export const CollaborationPhotoUpload = ({ 
  value, 
  onChange, 
  className = "" 
}: CollaborationPhotoUploadProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Por favor, selecciona solo archivos de imagen');
      return;
    }

    if (file.size > 2 * 1024 * 1024) { // 2MB limit
      alert('El archivo es demasiado grande. El límite es 2MB');
      return;
    }

    setIsUploading(true);
    
    try {
      // Check image dimensions
      const img = new Image();
      const objectUrl = URL.createObjectURL(file);
      
      img.onload = () => {
        URL.revokeObjectURL(objectUrl);
        
        // Check minimum dimensions
        if (img.width < 800 || img.height < 450) {
          alert('La imagen debe tener al menos 800x450 píxeles (16:9)');
          setIsUploading(false);
          return;
        }

        // Convert file to base64 for preview (in a real app, you'd upload to a server)
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          onChange?.(result);
          setIsUploading(false);
        };
        reader.readAsDataURL(file);
      };

      img.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        alert('Error al cargar la imagen');
        setIsUploading(false);
      };

      img.src = objectUrl;
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error al subir la imagen');
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    onChange?.(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center space-x-2 mb-4">
        <Camera className="w-5 h-5 text-orange-500" />
        <h2 className="text-lg font-semibold">Foto de la Colaboración</h2>
      </div>

      {value ? (
        <Card className="relative">
          <CardContent className="p-4">
            <div className="relative group">
              <img 
                src={value} 
                alt="Collaboration photo" 
                className="w-full h-48 object-cover rounded-lg"
                style={{ aspectRatio: '16/9' }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 rounded-lg flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-white text-gray-700 hover:bg-gray-50"
                    onClick={openFileDialog}
                  >
                    <Edit3 className="w-4 h-4 mr-1" />
                    Editar
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-white text-red-600 hover:bg-red-50"
                    onClick={handleRemove}
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Eliminar
                  </Button>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Haz clic en la imagen para editarla o eliminarla
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card 
          className={`border-2 border-dashed cursor-pointer transition-all duration-200 ${
            dragActive 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onClick={openFileDialog}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <CardContent className="p-8">
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                {isUploading ? (
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-500"></div>
                ) : (
                  <Upload className="w-6 h-6 text-gray-400" />
                )}
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-gray-900">
                  {isUploading ? 'Subiendo imagen...' : 'Agrega una foto'}
                </h3>
                <p className="text-sm text-gray-600">
                  Arrastra una imagen aquí o haz clic para seleccionar
                </p>
                <p className="text-xs text-gray-500">
                  Formato 16:9 • Mínimo 800x450px • PNG, JPG hasta 2MB
                </p>
              </div>
              <Button 
                variant="outline" 
                className="mx-auto"
                disabled={isUploading}
              >
                <Camera className="w-4 h-4 mr-2" />
                Seleccionar foto
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInput}
        className="hidden"
      />
      
      <p className="text-xs text-gray-500">
        Sube una imagen en formato 16:9 (mínimo 800x450 píxeles) que represente tu colaboración. Esto ayudará a los foodies a entender mejor tu propuesta.
      </p>
    </div>
  );
};