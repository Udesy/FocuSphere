import { ExternalLink } from "lucide-react";
import React from "react";
import { motion } from "motion/react";

const Support = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeIn" }}
      className="p-6 space-y-6 text-gray-900 dark:text-gray-100 text-lg leading-relaxed mx-auto"
    >
      <section>
        <h2 className="text-2xl font-semibold mb-1">🧠 About Focusphere</h2>
        <p>
          Focusphere is a fun side project I built to help people (and myself)
          focus better using a customizable timer and helpful stats. It’s
          completely open-source and free to use—no data tracking, no ads.
        </p>
      </section>

      <section>
        <h2 className="text-2xl  font-semibold mb-1">🛠️ Found a Bug?</h2>
        <p>
          If you run into an issue, feel free to{" "}
          <a
            href="https://github.com/Udesy/FocuSphere/issues"
            className="text-purple-500 hover:underline inline-flex items-center gap-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            open an issue on GitHub <ExternalLink size={14} />
          </a>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-1">💡 Suggest a Feature</h2>
        <p>
          Got an idea to improve the app?{" "}
          <a
            href="https://github.com/Udesy/FocuSphere/issues"
            className="text-purple-500 hover:underline inline-flex items-center gap-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            Create a GitHub issue <ExternalLink size={14} />
          </a>{" "}
          or fork it and submit a PR!
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-1">❤️ A Note from Me</h2>
        <p>
          Thanks for using Focusphere. I built this as a creative outlet and a
          way to learn while helping others. If you find it useful, consider
          giving it a ⭐ on GitHub.
        </p>
      </section>
    </motion.div>
  );
};

export default Support;
