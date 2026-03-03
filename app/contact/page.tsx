"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Instagram,
  Linkedin,
  Globe,
  Sparkles,
  X,
  MessageCircle,
  AtSign,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";
import Navbar from "@/components/Navbar";

const ContactPage = () => {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [activeField, setActiveField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    const formData = new FormData(e.currentTarget);
    const accessKey =
      process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ||
      "YOUR_WEB3FORMS_ACCESS_KEY";

    if (accessKey === "YOUR_WEB3FORMS_ACCESS_KEY" || !accessKey) {
      setErrorMsg("Missing Web3Forms Access Key. Add it to .env.local");
      setStatus("error");
      return;
    }

    formData.append("access_key", accessKey);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
      } else {
        setErrorMsg(data.message || "Submission failed. Please try again.");
        setStatus("error");
      }
    } catch (error) {
      setErrorMsg("Network error. Check your connection.");
      setStatus("error");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as any },
    },
  };

  const floatingLabelVariants = {
    inactive: { y: 0, scale: 1, opacity: 0.3 },
    active: {
      y: -24,
      scale: 0.85,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
  } as any;

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-black dark:text-white transition-colors duration-500 selection:bg-[#0DA5F0]/30 dark:selection:bg-[#F90101]/30 overflow-x-hidden">
      {/* BACKGROUND INFRASTRUCTURE */}
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
      <div className="fixed inset-0 z-0 pointer-events-none bg-gradient-to-b from-transparent via-black/[0.02] dark:via-white/[0.01] to-transparent" />

      <Navbar isReady={true} />

      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* LEFT: CONTENT & SOCIALS (RESTORED HERO) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-5 flex flex-col justify-between"
          >
            <div className="space-y-8">
              <motion.div
                variants={itemVariants}
                className="flex items-center gap-3"
              >
                <div className="h-[1px] w-12 bg-[#0DA5F0]/30 dark:bg-[#F90101]/30" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">
                  Direct Access
                </span>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="text-7xl md:text-92xl font-black tracking-tighter leading-[0.85]"
              >
                Get In
                <br />
                <span className="text-[#0DA5F0] dark:text-[#F90101]">
                  Touch
                </span>
              </motion.h1>

              <motion.div variants={itemVariants} className="space-y-6">
                <p className="text-xl dark:text-white/40 text-black/40 font-medium max-w-sm leading-tight border-l-2 border-[#0DA5F0]/20 dark:border-[#F90101]/20 pl-6">
                  Bridge the gap between idea and execution. Our team is ready
                  to scale your next project.
                </p>

                {/* WHATSAPP RESTORED CTA */}
                <motion.a
                  href="https://chat.whatsapp.com/IeO0TMZYkh7LdCK264UBp3"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02, x: 10 }}
                  className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/20 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all duration-500 font-bold group"
                >
                  <MessageCircle className="w-5 h-5" />
                  Join our WhatsApp Community
                  <ChevronRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </motion.a>
              </motion.div>
            </div>

            <div className="mt-12 space-y-8">
              <motion.div
                variants={itemVariants}
                className="grid grid-cols-1 gap-10"
              >
                <div className="group">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30 mb-4">
                    Official Channel
                  </p>
                  <a
                    href="mailto:thehackshastra@gmail.com"
                    className="text-2xl font-black hover:text-[#0DA5F0] dark:hover:text-[#F90101] transition-colors duration-300 flex items-center gap-3"
                  >
                    thehackshastra@gmail.com
                    <ChevronRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </a>
                </div>
                <div className="group">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30 mb-4">
                    Base of Operations
                  </p>
                  <p className="text-2xl font-black flex items-center gap-3 hover:text-[#0DA5F0] dark:hover:text-[#F90101] transition-colors duration-300">
                    New Delhi, India{" "}
                    <Globe className="w-5 h-5 opacity-40 group-hover:rotate-12 transition-transform" />
                  </p>
                </div>
              </motion.div>

              {/* THE SOCIAL DOCK (KEPT) */}
              <motion.div variants={itemVariants} className="space-y-6 pt-4">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-20 ml-2">
                  Satellite Uplinks
                </p>
                <div className="flex items-center gap-3 p-3 rounded-[2.5rem] bg-black/[0.03] dark:bg-white/[0.03] border border-black/5 dark:border-white/5 backdrop-blur-3xl w-fit shadow-inner">
                  {[
                    {
                      icon: Linkedin,
                      href: "https://linkedin.com/company/hackshastraa",
                      color: "#0077B5",
                      label: "LinkedIn",
                    },
                    {
                      icon: Instagram,
                      href: "https://instagram.com/hackshastra",
                      color: "#E4405F",
                      label: "Insta",
                    },
                    {
                      icon: X,
                      href: "https://x.com/hackshastra",
                      color: "#000000",
                      label: "X.com",
                    },
                    {
                      icon: AtSign,
                      href: "https://www.threads.net/@hackshastra",
                      color: "#60A5FA",
                      label: "Threads",
                    },
                  ].map((social, i) => (
                    <motion.a
                      key={i}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -5, scale: 1.1 }}
                      className="relative group w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 bg-white dark:bg-black border border-black/5 dark:border-white/10 shadow-lg text-black dark:text-white hover:text-white dark:hover:text-white font-bold"
                    >
                      <div className="absolute inset-0 rounded-2xl bg-[#0DA5F0] dark:bg-[#F90101] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <social.icon
                        className="w-6 h-6 relative z-10"
                        strokeWidth={2.5}
                      />

                      <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 px-3 py-1 bg-black dark:bg-white text-white dark:text-black text-[9px] font-black uppercase tracking-widest rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 whitespace-nowrap pointer-events-none border border-white/10">
                        {social.label}
                      </div>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* RIGHT PANEL: COMMAND CENTER FORM */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success-screen"
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="relative p-1 rounded-[3.5rem] bg-gradient-to-br from-[#0DA5F0] to-[#0DA5F0]/20 dark:from-[#F90101] dark:to-[#F90101]/20 shadow-[0_0_100px_rgba(13,165,240,0.1)] dark:shadow-[0_0_100px_rgba(249,1,1,0.1)]"
                >
                  <div className="bg-white dark:bg-[#0c0c0c] rounded-[3.3rem] p-12 md:p-20 text-center space-y-8 relative overflow-hidden backdrop-blur-4xl shadow-2xl">
                    <div
                      className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
                      style={{
                        backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
                        backgroundSize: "15px 15px",
                      }}
                    />

                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.2 }}
                      className="w-24 h-24 bg-[#0DA5F0]/10 dark:bg-[#F90101]/10 rounded-full flex items-center justify-center mx-auto"
                    >
                      <CheckCircle2
                        size={48}
                        className="text-[#0DA5F0] dark:text-[#F90101]"
                      />
                    </motion.div>

                    <div className="space-y-4 relative z-10">
                      <h2 className="text-5xl font-black tracking-tighter uppercase">
                        Message
                        <br />
                        Sent
                      </h2>
                      <p className="text-xl opacity-40 font-medium max-w-xs mx-auto">
                        Your message has been received. Our team will get back
                        to you shortly.
                      </p>
                    </div>

                    <div className="pt-8 relative z-10">
                      <button
                        onClick={() => setStatus("idle")}
                        className="px-10 py-4 rounded-full border-2 border-black/10 dark:border-white/10 hover:border-[#0DA5F0] dark:hover:border-[#F90101] hover:text-[#0DA5F0] dark:hover:text-[#F90101] transition-all font-black text-[10px] uppercase tracking-[0.3em]"
                      >
                        Send Another Message
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="form-screen"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="relative group"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-black/5 to-black/5 dark:from-white/5 dark:to-white/5 rounded-[4rem] blur-xl opacity-50 group-hover:opacity-100 transition-opacity" />

                  <div className="relative bg-white dark:bg-[#0c0c0c] rounded-[3.5rem] p-1 md:p-1.5 border border-black/10 dark:border-white/10 shadow-2xl overflow-hidden backdrop-blur-3xl">
                    <div className="p-8 md:p-12 space-y-10 relative">
                      <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                        <Sparkles size={140} />
                      </div>

                      <div className="flex justify-between items-end border-b border-black/5 dark:border-white/5 pb-8">
                        <div className="space-y-1">
                          <span className="text-[9px] font-black uppercase tracking-[0.5em] text-[#0DA5F0] dark:text-[#F90101]">
                            Community Portal
                          </span>
                          <p className="text-[10px] font-bold opacity-30">
                            Status: Awaiting your message
                          </p>
                        </div>
                        <div className="flex gap-1.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-red-500/50" />
                          <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/50" />
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500/50" />
                        </div>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                          <div className="relative group/input">
                            <motion.label
                              variants={floatingLabelVariants}
                              animate={
                                activeField === "name" ? "active" : "inactive"
                              }
                              className="absolute left-0 text-[10px] font-black uppercase tracking-[0.2em] pointer-events-none origin-left"
                            >
                              01 / Your Name
                            </motion.label>
                            <input
                              required
                              name="name"
                              type="text"
                              onFocus={() => setActiveField("name")}
                              onBlur={() => setActiveField(null)}
                              autoComplete="off"
                              className="w-full bg-transparent border-b border-black/10 dark:border-white/10 py-4 outline-none focus:border-[#0DA5F0] dark:focus:border-[#F90101] transition-all duration-700 text-lg font-bold placeholder:opacity-0"
                            />
                            <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#0DA5F0] dark:bg-[#F90101] transition-all duration-700 group-focus-within/input:w-full" />
                          </div>

                          <div className="relative group/input">
                            <motion.label
                              variants={floatingLabelVariants}
                              animate={
                                activeField === "email" ? "active" : "inactive"
                              }
                              className="absolute left-0 text-[10px] font-black uppercase tracking-[0.2em] pointer-events-none origin-left"
                            >
                              02 / Email Address
                            </motion.label>
                            <input
                              required
                              name="email"
                              type="email"
                              onFocus={() => setActiveField("email")}
                              onBlur={() => setActiveField(null)}
                              autoComplete="off"
                              className="w-full bg-transparent border-b border-black/10 dark:border-white/10 py-4 outline-none focus:border-[#0DA5F0] dark:focus:border-[#F90101] transition-all duration-700 text-lg font-bold placeholder:opacity-0"
                            />
                            <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#0DA5F0] dark:bg-[#F90101] transition-all duration-700 group-focus-within/input:w-full" />
                          </div>
                        </div>

                        <div className="relative group/input pt-4">
                          <motion.label
                            variants={floatingLabelVariants}
                            animate={
                              activeField === "message" ? "active" : "inactive"
                            }
                            className="absolute left-0 text-[10px] font-black uppercase tracking-[0.2em] pointer-events-none origin-left"
                          >
                            03 / Your Message
                          </motion.label>
                          <textarea
                            required
                            name="message"
                            rows={4}
                            onFocus={() => setActiveField("message")}
                            onBlur={() => setActiveField(null)}
                            className="w-full bg-transparent border-b border-black/10 dark:border-white/10 py-4 outline-none focus:border-[#0DA5F0] dark:focus:border-[#F90101] transition-all duration-700 text-lg font-bold placeholder:opacity-0 resize-none min-h-[90px]"
                          />
                        </div>

                        <div className="pt-8 flex flex-col gap-6">
                          <motion.button
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.98 }}
                            disabled={status === "loading"}
                            type="submit"
                            className="relative w-full h-16 bg-black dark:bg-white text-white dark:text-black rounded-3xl font-black uppercase tracking-[0.4em] text-[11px] flex items-center justify-center gap-5 transition-all duration-500 overflow-hidden group/btn shadow-[0_20px_50px_rgba(0,0,0,0.1)] cursor-pointer"
                          >
                            <div className="absolute inset-0 bg-[#0DA5F0] dark:bg-[#F90101] translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
                            <span className="relative z-10 flex items-center gap-5 group-hover/btn:text-white dark:group-hover/btn:text-white transition-colors duration-500">
                              {status === "loading" ? (
                                <div className="w-6 h-6 border-4 border-current border-t-transparent rounded-full animate-spin" />
                              ) : (
                                <>
                                  Send Message{" "}
                                  <Send
                                    size={18}
                                    strokeWidth={2.5}
                                    className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform"
                                  />
                                </>
                              )}
                            </span>
                          </motion.button>

                          <AnimatePresence>
                            {status === "error" && (
                              <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="flex items-center gap-3 p-4 rounded-2xl bg-red-500/5 dark:bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black uppercase tracking-widest"
                              >
                                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                {errorMsg ||
                                  "Unable to send. Please check your connection."}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </form>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      <div className="fixed left-10 bottom-10 hidden xl:block pointer-events-none">
        <span className="text-[12px] font-black opacity-20 tracking-[1em] rotate-180 [writing-mode:vertical-lr]">
          HACKSHASTRA // COMMUNITY
        </span>
      </div>
    </div>
  );
};

export default ContactPage;
