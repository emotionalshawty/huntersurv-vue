export const useAvatarUrl = () => {
  const getAvatarUrl = (name: string): string => {
    const normalized = name
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, '')
      .replace(/\s+/g, ' ');

    if (normalized.includes('shar')) {
      return '/avatars/shar.jpg';
    }

    if (normalized.includes('godrick') || normalized.includes('godkick')) {
      return '/avatars/godrick.png';
    }

    if (normalized === 'jiub') {
      return '/avatars/jiub.jpg';
    }

    if (normalized === 'serana') {
      return '/avatars/serana.jpg';
    }

    if (normalized.includes('dark brotherhood')) {
      return '/avatars/dbrotherhood.png';
    }

    if (normalized.includes('lord ganja')) {
      return '/ganjagod.png';
    }

    if (normalized.includes('astarion')) {
      return '/avatars/astarion.png';
    }

    if (normalized.includes('hevnoraak')) {
      return '/avatars/Hevnoraak_Mask.webp';
    }

    if (normalized.includes('ordinator')) {
      return '/avatars/ordinator.jpg';
    }

    const seed = name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&backgroundColor=1a0505`;
  };

  return {
    getAvatarUrl,
  };
};
