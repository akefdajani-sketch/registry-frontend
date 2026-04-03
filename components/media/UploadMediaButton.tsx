'use client';

import { useState } from 'react';
import { buildApiUrl } from '../../lib/api';

type Props = {
  municipalityId: string;
  entityType: string;
  entityId: string;
  mediaCategory: string;
};

export default function UploadMediaButton(props: Props) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  async function handleFileChange(file: File) {
    setLoading(true);
    setStatus('Preparing upload...');

    try {
      const signRes = await fetch(buildApiUrl('/api/media/sign-upload'), {
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
      });

      const signed = await signRes.json();

      if (!signed.uploadUrl) {
        setStatus('The backend media route is still returning a placeholder response. Upload wiring is ready but the backend needs real signed URLs.');
        return;
      }

      await fetch(signed.uploadUrl, {
        method: 'PUT',
        headers: { 'Content-Type': file.type },
        body: file,
      });

      await fetch(buildApiUrl('/api/media/register'), {
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

      setStatus('Upload complete');
    } catch (error: any) {
      setStatus(error.message || 'Upload failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="stack">
      <label className="button">
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
      {status ? <div className="notice">{status}</div> : null}
    </div>
  );
}
