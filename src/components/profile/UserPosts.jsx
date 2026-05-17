import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import PostFeed from "../community/PostsFeed";

export default function UserPosts() {
  const { t } = useTranslation();
  const user = useSelector((state) => state.user.user);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="mb-6"
    >
      <h2 className="text-[#161A41] dark:text-white mb-4">Posts</h2>
      <PostFeed profileId={user?.id} />
    </motion.div>
  );
}