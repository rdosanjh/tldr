'use client';

interface DownloadButtonProps {
  audioBase64: string;
  filename: string;
}

function sanitizeFilename(name: string): string {
  return name.replace(/[^a-z0-9]/gi, '_').substring(0, 100);
}

function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binaryString = window.atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

export function DownloadButton({ audioBase64, filename }: DownloadButtonProps) {
  const handleDownload = () => {
    const arrayBuffer = base64ToArrayBuffer(audioBase64);
    const blob = new Blob([arrayBuffer], { type: 'audio/mpeg' });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.style.display = 'none';
    link.href = url;
    link.download = `${sanitizeFilename(filename)}.mp3`;

    document.body.appendChild(link);
    link.click();

    // Clean up after a delay
    window.setTimeout(() => {
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    }, 100);
  };

  return (
    <button
      onClick={handleDownload}
      className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
    >
      Download MP3
    </button>
  );
}
