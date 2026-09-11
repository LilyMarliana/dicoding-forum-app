import {useState} from 'react';

function getInitials(name) {
  if (!name) return '?';
  return name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((word) => word[0]?.toUpperCase())
      .join('');
}

function Avatar({
  src, name, size = 32, useInitials = false,
}) {
  const [imgFailed, setImgFailed] = useState(false);

  if (useInitials || !src || imgFailed) {
    return (
      <div
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          background: 'var(--color-primary)',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: size * 0.4,
          fontFamily: 'var(--font-mono)',
          fontWeight: 600,
          flexShrink: 0,
        }}
      >
        {getInitials(name)}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={name}
      width={size}
      height={size}
      style={{borderRadius: '50%', objectFit: 'cover', flexShrink: 0}}
      onError={() => setImgFailed(true)}
    />
  );
}

export default Avatar;
