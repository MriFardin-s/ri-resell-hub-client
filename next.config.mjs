/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // এটি Next.js কে বলে যে ইমেজটি যেভাবে আছে সেভাবেই (কোনো এক্সটার্নাল অপ্টিমাইজেশান ছাড়া) দেখাও
    unoptimized: true, 
  },
};

export default nextConfig;