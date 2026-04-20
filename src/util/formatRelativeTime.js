import { formatDistanceToNowStrict } from 'date-fns';
import { arSA, enUS } from 'date-fns/locale';
import i18next from 'i18next';

export const formatRelativeTime = (date) => {
  if (!date) return '';
  
  const locale = i18next.language === 'ar' ? arSA : enUS;

  // formatDistanceToNowStrict gives you "1 hour", "3 minutes", etc.
  let relativeTime = formatDistanceToNowStrict(new Date(date), {
    addSuffix: false, 
    locale: locale,
  });

  // Shorten the strings if you want "1h" instead of "1 hour"
  // For Arabic, it's often better to keep the full word for clarity
  return relativeTime;
};