"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  type Event,
  type TeamMember,
  type Chapter,
  type GalleryImage,
  type Sponsor,
} from "@/lib/types";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { useTheme } from "next-themes";
import {
  Trash2,
  Edit3,
  Plus,
  ExternalLink,
  Calendar,
  MapPin,
  Users,
  Trophy,
  Globe,
  Camera,
  Mail,
  User,
  School,
  Map,
  ShieldCheck,
  Image as ImageIcon,
} from "lucide-react";

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [shaking, setShaking] = useState(false);
  const { resolvedTheme } = useTheme();
  const accent = resolvedTheme === "dark" ? "#FA0001" : "#0DA5F0";

  const attempt = () => {
    if (value === ADMIN_PASSWORD) {
      sessionStorage.setItem("hs_admin_unlocked", "1");
      onUnlock();
    } else {
      setError(true);
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm"
      >
        <div className="mb-8 text-center">
          <div
            className="text-[10px] uppercase tracking-[0.4em] font-bold mb-3"
            style={{ color: accent }}
          >
            Admin Portal
          </div>
          <h1 className="text-4xl font-black tracking-tighter dark:text-white text-black">
            Identify <span style={{ color: accent }}>Yourself</span>
          </h1>
        </div>

        <motion.div
          animate={shaking ? { x: [0, -10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="space-y-4"
        >
          <input
            type="password"
            placeholder="••••••••"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && attempt()}
            className={`w-full dark:bg-white/5 bg-black/5 border px-5 py-4 dark:text-white text-black text-sm outline-none transition-all duration-300 placeholder:opacity-30 rounded-xl ${
              error
                ? "border-red-500/50"
                : "border-black/10 dark:border-white/10 focus:border-opacity-100"
            }`}
            style={{ borderColor: !error && value ? accent + "40" : undefined }}
          />
          <button
            onClick={attempt}
            className="w-full text-white text-xs font-black uppercase tracking-widest py-4 transition-all duration-300 active:scale-[0.98] rounded-xl"
            style={{ backgroundColor: accent }}
          >
            Unlock System
          </button>
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-[10px] text-center font-bold uppercase tracking-wider"
            >
              Access Denied
            </motion.p>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}

function Toast({
  message,
  type,
}: {
  message: string;
  type: "success" | "error";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20, x: "-50%" }}
      animate={{ opacity: 1, y: 0, x: "-50%" }}
      exit={{ opacity: 0, y: -20, x: "-50%" }}
      className={`fixed top-6 left-1/2 z-50 px-5 py-3 text-sm font-semibold shadow-xl rounded-full ${
        type === "success"
          ? "bg-emerald-500 text-white"
          : "bg-red-500 text-white"
      }`}
    >
      {message}
    </motion.div>
  );
}

const labelStyle =
  "block text-[10px] uppercase tracking-widest dark:text-white/40 text-black/40 mb-2 font-bold";
const inputStyle =
  "w-full dark:bg-white/5 bg-black/5 border dark:border-white/10 border-black/10 px-4 py-3 dark:text-white text-black text-sm outline-none focus:border-opacity-100 transition-all duration-300 rounded-lg";

function EventForm({
  initial,
  onSave,
  onCancel,
  saving,
}: {
  initial: Partial<Event>;
  onSave: (data: any) => void;
  onCancel: () => void;
  saving: boolean;
}) {
  const [form, setForm] = useState(initial);
  const { resolvedTheme } = useTheme();
  const accent = resolvedTheme === "dark" ? "#FA0001" : "#0DA5F0";

  const set = (key: string, val: any) =>
    setForm((prev) => ({ ...prev, [key]: val }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      className="dark:bg-zinc-900 bg-zinc-50 border dark:border-white/10 border-black/10 p-6 md:p-8 space-y-8 rounded-2xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className={labelStyle}>Event Title *</label>
          <input
            value={form.title}
            onChange={(e) => set("title", e.target.value)}
            placeholder="e.g. SnowHackIPEC 2024"
            className={inputStyle}
            style={{
              borderLeft: form.title ? `3px solid ${accent}` : undefined,
            }}
          />
        </div>
        <div>
          <label className={labelStyle}>Execution Date *</label>
          <input
            type="date"
            value={form.date}
            onChange={(e) => set("date", e.target.value)}
            className={inputStyle}
          />
        </div>
        <div>
          <label className={labelStyle}>Venue / Location *</label>
          <input
            value={form.venue}
            onChange={(e) => set("venue", e.target.value)}
            placeholder="e.g. IPEC Campus"
            className={inputStyle}
          />
        </div>
        <div>
          <label className={labelStyle}>Event Format *</label>
          <input
            value={form.format}
            onChange={(e) => set("format", e.target.value)}
            placeholder="e.g. Physical Hackathon"
            className={inputStyle}
          />
        </div>
        <div className="md:col-span-2">
          <label className={labelStyle}>Description Abstract</label>
          <textarea
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
            rows={4}
            className={inputStyle + " resize-none"}
            placeholder="Tell us more about the event goals..."
          />
        </div>

        <div className="md:col-span-2">
          <label className={labelStyle}>Visual Identity (Cover URL)</label>
          <input
            value={form.cover_image}
            onChange={(e) => set("cover_image", e.target.value)}
            placeholder="Direct link to image..."
            className={inputStyle}
          />
        </div>

        <div className="md:col-span-2">
          <label className={labelStyle}>External Registration Gateway</label>
          <input
            value={form.registration_link}
            onChange={(e) => set("registration_link", e.target.value)}
            placeholder="Unstop / Devfolio / Form link..."
            className={inputStyle}
          />
        </div>

        <div className="md:col-span-2 flex items-center justify-between p-4 dark:bg-white/5 bg-black/5 transition-all rounded-xl">
          <div>
            <span className="text-sm font-bold block dark:text-white text-black">
              Timeline Status
            </span>
            <span className="text-[10px] uppercase tracking-wider opacity-40">
              {form.is_upcoming ? "Live/Future Event" : "Historical Event"}
            </span>
          </div>
          <button
            type="button"
            onClick={() => set("is_upcoming", !form.is_upcoming)}
            className={`relative w-12 h-6 rounded-full transition-all duration-500 ${form.is_upcoming ? "" : "opacity-50"}`}
            style={{ backgroundColor: form.is_upcoming ? accent : "#ccc" }}
          >
            <span
              className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-500 shadow-md ${form.is_upcoming ? "right-1" : "left-1"}`}
            />
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => onSave(form)}
          disabled={saving || !form.title || !form.date || !form.venue}
          className="flex-1 text-white text-[10px] font-black uppercase tracking-[0.2em] py-4 transition-all active:scale-[0.98] disabled:opacity-20 rounded-lg"
          style={{ backgroundColor: accent }}
        >
          {saving ? "Processing..." : "Commit Event"}
        </button>
        <button
          onClick={onCancel}
          className="px-8 dark:bg-white/5 bg-black/5 dark:text-white text-black text-[10px] font-black uppercase tracking-[0.2em] py-4 hover:opacity-70 transition-all rounded-lg"
        >
          Abort
        </button>
      </div>
    </motion.div>
  );
}

function TeamMemberForm({
  initial,
  onSave,
  onCancel,
  saving,
}: {
  initial: Partial<TeamMember>;
  onSave: (data: any) => void;
  onCancel: () => void;
  saving: boolean;
}) {
  const [form, setForm] = useState(initial);
  const { resolvedTheme } = useTheme();
  const accent = resolvedTheme === "dark" ? "#FA0001" : "#0DA5F0";

  const set = (key: string, val: any) =>
    setForm((prev) => ({ ...prev, [key]: val }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      className="dark:bg-zinc-900 bg-zinc-50 border dark:border-white/10 border-black/10 p-6 md:p-8 space-y-8 rounded-2xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={labelStyle}>Member Name *</label>
          <input
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="e.g. Tanmay Tiwari"
            className={inputStyle}
          />
        </div>
        <div>
          <label className={labelStyle}>Designation / Role *</label>
          <input
            value={form.role}
            onChange={(e) => set("role", e.target.value)}
            placeholder="e.g. Management Lead"
            className={inputStyle}
          />
        </div>
        <div className="md:col-span-2">
          <label className={labelStyle}>Avatar URL</label>
          <input
            value={form.image}
            onChange={(e) => set("image", e.target.value)}
            placeholder="Direct link to portrait..."
            className={inputStyle}
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => onSave(form)}
          disabled={saving || !form.name || !form.role}
          className="flex-1 text-white text-[10px] font-black uppercase tracking-[0.2em] py-4 transition-all active:scale-[0.98] disabled:opacity-20 rounded-lg"
          style={{ backgroundColor: accent }}
        >
          {saving ? "Processing..." : "Commit Member"}
        </button>
        <button
          onClick={onCancel}
          className="px-8 dark:bg-white/5 bg-black/5 dark:text-white text-black text-[10px] font-black uppercase tracking-[0.2em] py-4 hover:opacity-70 transition-all rounded-lg"
        >
          Abort
        </button>
      </div>
    </motion.div>
  );
}

function ChapterForm({
  initial,
  onSave,
  onCancel,
  saving,
}: {
  initial: Partial<Chapter>;
  onSave: (data: any) => void;
  onCancel: () => void;
  saving: boolean;
}) {
  const [form, setForm] = useState(initial);
  const { resolvedTheme } = useTheme();
  const accent = resolvedTheme === "dark" ? "#FA0001" : "#0DA5F0";

  const set = (key: string, val: any) =>
    setForm((prev) => ({ ...prev, [key]: val }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      className="dark:bg-zinc-900 bg-zinc-50 border dark:border-white/10 border-black/10 p-6 md:p-8 space-y-8 rounded-2xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={labelStyle}>College Name *</label>
          <input
            value={form.college}
            onChange={(e) => set("college", e.target.value)}
            placeholder="e.g. IPEC"
            className={inputStyle}
          />
        </div>
        <div>
          <label className={labelStyle}>City / Region *</label>
          <input
            value={form.city}
            onChange={(e) => set("city", e.target.value)}
            placeholder="e.g. Ghaziabad"
            className={inputStyle}
          />
        </div>
        <div>
          <label className={labelStyle}>Chapter Lead *</label>
          <input
            value={form.lead}
            onChange={(e) => set("lead", e.target.value)}
            placeholder="e.g. Affan Khan"
            className={inputStyle}
          />
        </div>
        <div>
          <label className={labelStyle}>Logo URL</label>
          <input
            value={form.logo}
            onChange={(e) => set("logo", e.target.value)}
            placeholder="Direct link to logo..."
            className={inputStyle}
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => onSave(form)}
          disabled={saving || !form.college || !form.lead}
          className="flex-1 text-white text-[10px] font-black uppercase tracking-[0.2em] py-4 transition-all active:scale-[0.98] disabled:opacity-20 rounded-lg"
          style={{ backgroundColor: accent }}
        >
          {saving ? "Processing..." : "Commit Chapter"}
        </button>
        <button
          onClick={onCancel}
          className="px-8 dark:bg-white/5 bg-black/5 dark:text-white text-black text-[10px] font-black uppercase tracking-[0.2em] py-4 hover:opacity-70 transition-all rounded-lg"
        >
          Abort
        </button>
      </div>
    </motion.div>
  );
}

function SponsorForm({
  initial,
  onSave,
  onCancel,
  saving,
}: {
  initial: Partial<Sponsor>;
  onSave: (data: any) => void;
  onCancel: () => void;
  saving: boolean;
}) {
  const [form, setForm] = useState(initial);
  const { resolvedTheme } = useTheme();
  const accent = resolvedTheme === "dark" ? "#FA0001" : "#0DA5F0";

  const set = (key: string, val: any) =>
    setForm((prev) => ({ ...prev, [key]: val }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      className="dark:bg-zinc-900 bg-zinc-50 border dark:border-white/10 border-black/10 p-6 md:p-8 space-y-8 rounded-2xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={labelStyle}>Sponsor Name *</label>
          <input
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="e.g. Google Cloud"
            className={inputStyle}
          />
        </div>
        <div>
          <label className={labelStyle}>Logo URL *</label>
          <input
            value={form.logo}
            onChange={(e) => set("logo", e.target.value)}
            placeholder="Direct link to logo..."
            className={inputStyle}
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => onSave(form)}
          disabled={saving || !form.name || !form.logo}
          className="flex-1 text-white text-[10px] font-black uppercase tracking-[0.2em] py-4 transition-all active:scale-[0.98] disabled:opacity-20 rounded-lg"
          style={{ backgroundColor: accent }}
        >
          {saving ? "Processing..." : "Commit Sponsor"}
        </button>
        <button
          onClick={onCancel}
          className="px-8 dark:bg-white/5 bg-black/5 dark:text-white text-black text-[10px] font-black uppercase tracking-[0.2em] py-4 hover:opacity-70 transition-all rounded-lg"
        >
          Abort
        </button>
      </div>
    </motion.div>
  );
}

function GalleryForm({
  onSave,
  onCancel,
  saving,
}: {
  onSave: (data: any) => void;
  onCancel: () => void;
  saving: boolean;
}) {
  const [url, setUrl] = useState("");
  const { resolvedTheme } = useTheme();
  const accent = resolvedTheme === "dark" ? "#FA0001" : "#0DA5F0";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      className="dark:bg-zinc-900 bg-zinc-50 border dark:border-white/10 border-black/10 p-6 md:p-8 space-y-8 rounded-2xl"
    >
      <div>
        <label className={labelStyle}>Image URL *</label>
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Cloudinary or Direct Image URL..."
          className={inputStyle}
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => onSave({ url })}
          disabled={saving || !url}
          className="flex-1 text-white text-[10px] font-black uppercase tracking-[0.2em] py-4 transition-all active:scale-[0.98] disabled:opacity-20 rounded-lg"
          style={{ backgroundColor: accent }}
        >
          {saving ? "Processing..." : "Commit Image"}
        </button>
        <button
          onClick={onCancel}
          className="px-8 dark:bg-white/5 bg-black/5 dark:text-white text-black text-[10px] font-black uppercase tracking-[0.2em] py-4 hover:opacity-70 transition-all rounded-lg"
        >
          Abort
        </button>
      </div>
    </motion.div>
  );
}

function DataRow({
  title,
  subtitle,
  image,
  onEdit,
  onDelete,
  badge,
  icon: Icon,
}: {
  title: string;
  subtitle: string;
  image?: string;
  onEdit?: () => void;
  onDelete: () => void;
  badge?: string;
  icon: any;
}) {
  const { resolvedTheme } = useTheme();
  const accent = resolvedTheme === "dark" ? "#FA0001" : "#0DA5F0";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="group flex items-center gap-4 dark:bg-zinc-900 bg-white border dark:border-white/10 border-black/10 p-4 hover:border-opacity-100 transition-all duration-300 rounded-xl"
    >
      <div className="relative w-14 h-14 shrink-0 overflow-hidden bg-black/5 dark:bg-white/5 rounded-full border border-black/5 dark:border-white/5">
        {image ? (
          <Image src={image} alt="" fill className="object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center opacity-20">
            <Icon size={20} />
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-sm font-black dark:text-white text-black truncate tracking-tighter uppercase">
            {title}
          </h3>
          {badge && (
            <span
              className="text-[8px] px-1.5 py-0.5 font-black tracking-widest border rounded uppercase"
              style={{ color: accent, borderColor: accent + "40" }}
            >
              {badge}
            </span>
          )}
        </div>
        <p className="text-[10px] dark:text-white/40 text-black/40 font-bold uppercase tracking-wider truncate">
          {subtitle}
        </p>
      </div>

      <div className="flex gap-1.5">
        {onEdit && (
          <button
            onClick={onEdit}
            className="p-2 dark:bg-white/5 bg-black/5 hover:bg-black/10 dark:hover:bg-white/10 dark:text-white text-black transition-all rounded-lg"
          >
            <Edit3 size={12} />
          </button>
        )}
        <button
          onClick={onDelete}
          className="p-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white transition-all rounded-lg"
        >
          <Trash2 size={12} />
        </button>
      </div>
    </motion.div>
  );
}

type Tab = "events" | "team" | "chapters" | "gallery" | "sponsors";

export default function AdminPage() {
  const [unlocked, setUnlocked] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("events");
  const [data, setData] = useState<{
    events: Event[];
    team: TeamMember[];
    chapters: Chapter[];
    gallery: GalleryImage[];
    sponsors: Sponsor[];
  }>({ events: [], team: [], chapters: [], gallery: [], sponsors: [] });
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const { resolvedTheme } = useTheme();
  const accent = resolvedTheme === "dark" ? "#FA0001" : "#0DA5F0";

  useEffect(() => {
    if (sessionStorage.getItem("hs_admin_unlocked") === "1") setUnlocked(true);
  }, []);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const endpoints = ["events", "team", "chapters", "gallery", "sponsors"];
      const res = await Promise.all(endpoints.map((e) => fetch(`/api/${e}`)));
      const [events, team, chapters, gallery, sponsors] = await Promise.all(
        res.map((r) => r.json()),
      );
      setData({ events, team, chapters, gallery, sponsors });
    } catch (err) {
      showToast("System Link Failure", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (unlocked) fetchData();
  }, [unlocked]);

  const handleSave = async (formData: any) => {
    setSaving(true);
    try {
      const endpoint = `/api/${activeTab}`;
      let res: Response;

      if (editingItem) {
        res = await fetch(`${endpoint}?id=${editingItem._id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (!res.ok) throw new Error((await res.json()).error);
        showToast("Record Updated", "success");
      } else {
        res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (!res.ok) throw new Error((await res.json()).error);
        showToast("Record Initialized", "success");
      }

      setShowForm(false);
      setEditingItem(null);
      await fetchData();
    } catch (err: any) {
      showToast(err.message || "Sync Failed", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id?: string) => {
    if (!id || !confirm("PURGE RECORD? This action cannot be undone.")) return;
    const res = await fetch(`/api/${activeTab}?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      showToast("Record Purged", "success");
      await fetchData();
    } else {
      showToast("Purge Failed", "error");
    }
  };

  if (!unlocked)
    return (
      <>
        <Navbar isReady={true} />
        <PasswordGate onUnlock={() => setUnlocked(true)} />
      </>
    );

  const tabs: { id: Tab; label: string; icon: any }[] = [
    { id: "events", label: "Events", icon: Calendar },
    { id: "team", label: "Core Team", icon: Users },
    { id: "chapters", label: "Chapters", icon: School },
    { id: "gallery", label: "Gallery", icon: ImageIcon },
    { id: "sponsors", label: "Sponsors", icon: Trophy },
  ];

  return (
    <div className="min-h-screen dark:bg-[oklch(0.145_0_0)] bg-white transition-colors duration-500 pb-20">
      <Navbar isReady={true} />
      <AnimatePresence>
        {toast && <Toast message={toast.message} type={toast.type} />}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 pt-32 md:pt-40">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
          <div>
            <div className="text-[10px] uppercase tracking-[0.4em] font-black opacity-40 mb-2 dark:text-white text-black flex items-center gap-2">
              <ShieldCheck size={12} style={{ color: accent }} />
              Authorized Access Only
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter dark:text-white text-black uppercase leading-none">
              Control <span style={{ color: accent }}>Center</span>
            </h1>
          </div>

          <div className="flex bg-black/5 dark:bg-white/5 p-1.5 rounded-2xl border border-black/5 dark:border-white/5 overflow-x-auto max-w-full">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setShowForm(false);
                    setEditingItem(null);
                  }}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                    isActive
                      ? "bg-white dark:bg-zinc-800 shadow-xl scale-105"
                      : "opacity-40 hover:opacity-100"
                  }`}
                  style={{ color: isActive ? accent : "inherit" }}
                >
                  <Icon size={14} />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="relative">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-sm font-black uppercase tracking-[0.3em] dark:text-white/40 text-black/40">
              Manage / {activeTab}
            </h2>
            {!showForm && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={() => {
                  setEditingItem(null);
                  setShowForm(true);
                }}
                className="flex items-center gap-3 text-white text-[10px] font-black uppercase tracking-widest px-8 py-4 transition-all active:scale-[0.98] shadow-xl rounded-xl"
                style={{ backgroundColor: accent }}
              >
                <Plus size={16} /> New{" "}
                {activeTab === "team"
                  ? "Member"
                  : activeTab === "chapters"
                    ? "Chapter"
                    : activeTab === "gallery"
                      ? "Image"
                      : activeTab === "sponsors"
                        ? "Sponsor"
                        : "Event"}
              </motion.button>
            )}
          </div>

          <AnimatePresence mode="wait">
            {showForm ? (
              <div key="form">
                {activeTab === "events" && (
                  <EventForm
                    initial={editingItem || { is_upcoming: true }}
                    onSave={handleSave}
                    onCancel={() => {
                      setShowForm(false);
                      setEditingItem(null);
                    }}
                    saving={saving}
                  />
                )}
                {activeTab === "team" && (
                  <TeamMemberForm
                    initial={editingItem || {}}
                    onSave={handleSave}
                    onCancel={() => {
                      setShowForm(false);
                      setEditingItem(null);
                    }}
                    saving={saving}
                  />
                )}
                {activeTab === "chapters" && (
                  <ChapterForm
                    initial={editingItem || {}}
                    onSave={handleSave}
                    onCancel={() => {
                      setShowForm(false);
                      setEditingItem(null);
                    }}
                    saving={saving}
                  />
                )}
                {activeTab === "gallery" && (
                  <GalleryForm
                    onSave={handleSave}
                    onCancel={() => {
                      setShowForm(false);
                      setEditingItem(null);
                    }}
                    saving={saving}
                  />
                )}
                {activeTab === "sponsors" && (
                  <SponsorForm
                    initial={editingItem || {}}
                    onSave={handleSave}
                    onCancel={() => {
                      setShowForm(false);
                      setEditingItem(null);
                    }}
                    saving={saving}
                  />
                )}
              </div>
            ) : (
              <div
                key="list"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {loading ? (
                  [1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                      key={i}
                      className="h-24 dark:bg-white/5 bg-black/5 animate-pulse rounded-xl"
                    />
                  ))
                ) : (
                  <>
                    {activeTab === "events" &&
                      data.events.map((e) => (
                        <DataRow
                          key={e._id}
                          title={e.title}
                          subtitle={`${e.venue} // ${new Date(e.date).toLocaleDateString()}`}
                          image={e.cover_image}
                          badge={e.is_upcoming ? "Live" : "Past"}
                          icon={Calendar}
                          onEdit={() => {
                            setEditingItem(e);
                            setShowForm(true);
                          }}
                          onDelete={() => handleDelete(e._id)}
                        />
                      ))}
                    {activeTab === "team" &&
                      data.team.map((m) => (
                        <DataRow
                          key={m._id}
                          title={m.name}
                          subtitle={m.role}
                          image={m.image}
                          icon={User}
                          onEdit={() => {
                            setEditingItem(m);
                            setShowForm(true);
                          }}
                          onDelete={() => handleDelete(m._id)}
                        />
                      ))}
                    {activeTab === "chapters" &&
                      data.chapters.map((c) => (
                        <DataRow
                          key={c._id}
                          title={c.college}
                          subtitle={`${c.city} // Lead: ${c.lead}`}
                          image={c.logo}
                          icon={School}
                          onEdit={() => {
                            setEditingItem(c);
                            setShowForm(true);
                          }}
                          onDelete={() => handleDelete(c._id)}
                        />
                      ))}
                    {activeTab === "gallery" &&
                      data.gallery.map((g: any) => (
                        <DataRow
                          key={g._id}
                          title="Gallery Capture"
                          subtitle={new Date(g.created_at).toLocaleString()}
                          image={g.url}
                          icon={ImageIcon}
                          onEdit={undefined}
                          onDelete={() => handleDelete(g._id)}
                        />
                      ))}
                    {activeTab === "sponsors" &&
                      data.sponsors.map((s) => (
                        <DataRow
                          key={s._id}
                          title={s.name}
                          subtitle="Official Partner"
                          image={s.logo}
                          icon={Trophy}
                          onEdit={() => {
                            setEditingItem(s);
                            setShowForm(true);
                          }}
                          onDelete={() => handleDelete(s._id)}
                        />
                      ))}
                    {data[activeTab].length === 0 && (
                      <div className="col-span-full py-24 text-center dark:text-white/10 text-black/10 font-black uppercase tracking-[0.5em]">
                        Endpoint Clear // No Data
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
