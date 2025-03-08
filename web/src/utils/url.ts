export const createPath = (path: string) => {
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/${path}`;
};
