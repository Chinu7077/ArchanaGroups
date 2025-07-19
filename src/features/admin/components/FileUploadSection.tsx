'use client';

import { useState } from 'react';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Alert, AlertDescription } from '@/shared/components/ui/alert';
import { Badge } from '@/shared/components/ui/badge';
import {
  Upload,
  FileSpreadsheet,
  CheckCircle,
  AlertTriangle,
  X,
  File,
  UploadCloud,
} from 'lucide-react';
import { toast } from 'sonner';

interface FileUploadSectionProps {
  onUpload: (files: {
    dispatchFile?: File;
    dieselFile?: File;
  }) => Promise<void>;
  isUploading?: boolean;
  className?: string;
}

interface FileWithValidation {
  file: File;
  isValid: boolean;
  error?: string;
}

export function FileUploadSection({
  onUpload,
  isUploading = false,
  className,
}: FileUploadSectionProps) {
  const [dispatchFile, setDispatchFile] = useState<FileWithValidation | null>(
    null
  );
  const [dieselFile, setDieselFile] = useState<FileWithValidation | null>(null);
  const [isDragOver, setIsDragOver] = useState<'dispatch' | 'diesel' | null>(
    null
  );

  const validateFile = (file: File): { isValid: boolean; error?: string } => {
    // Check file type
    const allowedTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
      'application/vnd.ms-excel', // .xls
    ];

    if (
      !allowedTypes.includes(file.type) &&
      !file.name.match(/\.(xlsx|xls)$/i)
    ) {
      return {
        isValid: false,
        error: 'Please select an Excel file (.xlsx or .xls)',
      };
    }

    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return { isValid: false, error: 'File size must be less than 10MB' };
    }

    return { isValid: true };
  };

  const handleFileSelection = (file: File, type: 'dispatch' | 'diesel') => {
    const validation = validateFile(file);
    const fileWithValidation: FileWithValidation = {
      file,
      ...validation,
    };

    if (type === 'dispatch') {
      setDispatchFile(fileWithValidation);
    } else {
      setDieselFile(fileWithValidation);
    }

    if (!validation.isValid) {
      toast.error(`Invalid file: ${validation.error}`);
    }
  };

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: 'dispatch' | 'diesel'
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileSelection(file, type);
    }
  };

  const handleDrop = (
    event: React.DragEvent<HTMLDivElement>,
    type: 'dispatch' | 'diesel'
  ) => {
    event.preventDefault();
    setIsDragOver(null);

    const files = Array.from(event.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelection(files[0], type);
    }
  };

  const handleDragOver = (
    event: React.DragEvent<HTMLDivElement>,
    type: 'dispatch' | 'diesel'
  ) => {
    event.preventDefault();
    setIsDragOver(type);
  };

  const handleDragLeave = () => {
    setIsDragOver(null);
  };

  const removeFile = (type: 'dispatch' | 'diesel') => {
    if (type === 'dispatch') {
      setDispatchFile(null);
    } else {
      setDieselFile(null);
    }
  };

  const handleUpload = async () => {
    const validFiles: { dispatchFile?: File; dieselFile?: File } = {};

    if (dispatchFile?.isValid) {
      validFiles.dispatchFile = dispatchFile.file;
    }

    if (dieselFile?.isValid) {
      validFiles.dieselFile = dieselFile.file;
    }

    if (Object.keys(validFiles).length === 0) {
      toast.error('Please select at least one valid file to upload');
      return;
    }

    try {
      await onUpload(validFiles);
      // Clear files on successful upload
      setDispatchFile(null);
      setDieselFile(null);
    } catch (error) {
      // Error handling is done in parent component
      console.error('Upload error:', error);
    }
  };

  const FileUploadArea = ({
    type,
    file,
    title,
    description,
  }: {
    type: 'dispatch' | 'diesel';
    file: FileWithValidation | null;
    title: string;
    description: string;
  }) => (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">{title}</label>
      <div
        className={`cursor-pointer rounded-lg border-2 border-dashed p-6 text-center transition-all duration-200 ${
          isDragOver === type
            ? 'border-primary bg-primary/10 scale-105 shadow-md'
            : file?.isValid
              ? 'border-green-400 bg-green-50 shadow-sm'
              : file && !file.isValid
                ? 'border-red-400 bg-red-50 shadow-sm'
                : 'hover:border-primary border-gray-300 hover:bg-gray-50'
        }`}
        onDrop={(e) => handleDrop(e, type)}
        onDragOver={(e) => handleDragOver(e, type)}
        onDragLeave={handleDragLeave}
        onClick={() => document.getElementById(`${type}File`)?.click()}
      >
        {file ? (
          <div className="space-y-3">
            <div className="flex items-center justify-center space-x-3">
              <div
                className={`rounded-full p-2 ${file.isValid ? 'bg-green-100' : 'bg-red-100'}`}
              >
                <FileSpreadsheet
                  className={`h-6 w-6 ${file.isValid ? 'text-green-600' : 'text-red-600'}`}
                />
              </div>
              {file.isValid ? (
                <div className="flex items-center space-x-1 rounded-full bg-green-100 px-2 py-1">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-xs font-medium text-green-700">
                    Ready
                  </span>
                </div>
              ) : (
                <div className="flex items-center space-x-1 rounded-full bg-red-100 px-2 py-1">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <span className="text-xs font-medium text-red-700">
                    Invalid
                  </span>
                </div>
              )}
            </div>

            <div
              className={`rounded-lg p-3 ${file.isValid ? 'border border-green-200 bg-white' : 'border border-red-200 bg-white'}`}
            >
              <p
                className="truncate text-sm font-semibold text-gray-900"
                title={file.file.name}
              >
                {file.file.name}
              </p>
              <p className="mt-1 text-xs text-gray-500">
                {(file.file.size / (1024 * 1024)).toFixed(2)} MB •{' '}
                {file.file.type.includes('sheet') ? 'Excel' : 'CSV'}
              </p>
              {file.error && (
                <p className="mt-2 text-xs font-medium text-red-600">
                  {file.error}
                </p>
              )}
            </div>

            <div className="flex justify-center space-x-2">
              <Button
                size="sm"
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(type);
                }}
                className="hover:border-red-300 hover:bg-red-50"
              >
                <X className="mr-1 h-4 w-4" />
                Remove
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  document.getElementById(`${type}File`)?.click();
                }}
                className="hover:border-blue-300 hover:bg-blue-50"
              >
                <Upload className="mr-1 h-4 w-4" />
                Replace
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex flex-col items-center">
              <div className="mb-3 rounded-full bg-gray-100 p-3">
                <UploadCloud className="h-8 w-8 text-gray-400" />
              </div>
              <p className="text-sm font-medium text-gray-700">
                {isDragOver === type
                  ? 'Drop your file here'
                  : 'Choose a file or drag it here'}
              </p>
              <p className="mt-1 text-xs text-gray-500">{description}</p>
            </div>

            <div className="border-t pt-3">
              <Button
                variant="outline"
                size="sm"
                className="bg-white text-xs hover:bg-gray-50"
                onClick={(e) => {
                  e.stopPropagation();
                  document.getElementById(`${type}File`)?.click();
                }}
              >
                <File className="mr-1 h-3 w-3" />
                Browse Files
              </Button>
            </div>
          </div>
        )}
      </div>

      <Input
        type="file"
        accept=".xlsx,.xls"
        onChange={(e) => handleFileUpload(e, type)}
        className="hidden"
        id={`${type}File`}
        disabled={isUploading}
      />
    </div>
  );

  const hasValidFiles = dispatchFile?.isValid || dieselFile?.isValid;
  const hasAnyFiles = dispatchFile || dieselFile;

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Upload Excel Files
        </CardTitle>
        <CardDescription>
          Upload dispatch and diesel data files to process partner information
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FileUploadArea
            type="dispatch"
            file={dispatchFile}
            title="Dispatch Data"
            description="Excel or CSV files with dispatch information"
          />

          <FileUploadArea
            type="diesel"
            file={dieselFile}
            title="Diesel Data"
            description="Excel or CSV files with fuel consumption data"
          />
        </div>

        {hasAnyFiles && (
          <Alert
            className={
              hasValidFiles
                ? 'border-green-200 bg-green-50'
                : 'border-red-200 bg-red-50'
            }
          >
            {hasValidFiles ? (
              <CheckCircle className="h-4 w-4 text-green-600" />
            ) : (
              <AlertTriangle className="h-4 w-4 text-red-600" />
            )}
            <AlertDescription
              className={hasValidFiles ? 'text-green-800' : 'text-red-800'}
            >
              {hasValidFiles
                ? '✅ Files are ready for processing. Click "Process Files" to continue.'
                : '⚠️ Please fix file validation errors before uploading.'}
            </AlertDescription>
          </Alert>
        )}

        <div className="flex items-center justify-between border-t pt-4">
          <div className="flex gap-2">
            {dispatchFile?.isValid && (
              <Badge className="border-green-200 bg-green-100 text-green-800 hover:bg-green-200">
                <CheckCircle className="mr-1 h-3 w-3" />
                Dispatch Ready
              </Badge>
            )}
            {dieselFile?.isValid && (
              <Badge className="border-green-200 bg-green-100 text-green-800 hover:bg-green-200">
                <CheckCircle className="mr-1 h-3 w-3" />
                Diesel Ready
              </Badge>
            )}
          </div>

          <Button
            onClick={handleUpload}
            disabled={!hasValidFiles || isUploading}
            className={`min-w-[140px] transition-all duration-200 ${
              hasValidFiles && !isUploading
                ? 'scale-105 bg-green-600 text-white shadow-lg hover:bg-green-700'
                : ''
            }`}
          >
            {isUploading ? (
              <>
                <Upload className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : hasValidFiles ? (
              <>
                <CheckCircle className="mr-2 h-4 w-4" />
                Process Files
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Process Files
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
