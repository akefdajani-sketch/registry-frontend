'use client';

import { useState } from 'react';

type Props = {
  municipalityId: string;
  entityType: string;
  entityId: string;
  mediaCategory: string;
};

export default function UploadMediaButton(props: Props) {
  const [loading, setLoading] = useState(false);

  async function handleFileChange(file: File) {
    setLoading(true);

    try {
      const signRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/media/sign-upload`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            municipalityId: props.municipalityId,
            entityType: props.entityType,
            entityId: props.entityId,
            mediaCategory: props.mediaCategory,
            fileName: file.name,
            mimeType: file.type,
            fileSizeBytes: file.size,
          }),
        }
      );

      const signed = await signRes.json();

      await fetch(signed.uploadUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': file.type,
        },
        body: file,
      });

      await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/media/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          municipalityId: props.municipalityId,
          entityType: props.entityType,
          entityId: props.entityId,
          mediaCategory: props.mediaCategory,
          fileName: file.name,
          mimeType: file.type,
          fileSizeBytes: file.size,
          r2Key: signed.key,
          publicUrl: signed.publicUrl,
        }),
      });

      alert('Upload complete');
    } finally {
      setLoading(false);
    }
  }

  return (
    <label style={{ display: 'inline-flex', cursor: 'pointer', border: '1px solid #ddd', borderRadius: 999, padding: '10px 16px' }}>
      {loading ? 'Uploading...' : 'Upload file'}
      <input
        type="file"
        style={{ display: 'none' }}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFileChange(file);
        }}
      />
    </label>
  );
}
