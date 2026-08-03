import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Wallet, BarChart3, FileText, ShieldCheck, Zap, TrendingUp,
  ArrowRight, CheckCircle2, Star, Download, PieChart, Bell
} from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" }
  })
};

const features = [
  {
    icon: Wallet,
    color: "teal",
    bg: "bg-teal-50",
    text: "text-teal-700",
    ring: "ring-teal-100",
    title: "Smart Expense Tracking",
    desc: "Log expenses instantly with categories, dates, notes, and payment methods. Every rupee accounted for."
  },
  {
    icon: BarChart3,
    color: "blue",
    bg: "bg-blue-50",
    text: "text-blue-700",
    ring: "ring-blue-100",
    title: "Visual Analytics",
    desc: "Weekly, monthly and yearly spending charts. Understand exactly where your money goes."
  },
  {
    icon: FileText,
    color: "orange",
    bg: "bg-orange-50",
    text: "text-orange-700",
    ring: "ring-orange-100",
    title: "Downloadable Reports",
    desc: "Export your expenses as PDF, Excel or CSV. Share or analyze your data anytime, anywhere."
  },
  {
    icon: ShieldCheck,
    color: "emerald",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    ring: "ring-emerald-100",
    title: "Budget Control",
    desc: "Set category-level budget limits, get alerts before you overspend, and stay on track."
  },
  {
    icon: PieChart,
    color: "purple",
    bg: "bg-purple-50",
    text: "text-purple-700",
    ring: "ring-purple-100",
    title: "Category Insights",
    desc: "Pie charts for spending by category and payment method — spot your biggest spending habits fast."
  },
  {
    icon: Bell,
    color: "rose",
    bg: "bg-rose-50",
    text: "text-rose-700",
    ring: "ring-rose-100",
    title: "Smart Alerts",
    desc: "Get notified when you're close to budget limits. Never be caught off guard by overspending."
  }
];

const steps = [
  { step: "01", title: "Create your account", desc: "Sign up in seconds — no credit card required." },
  { step: "02", title: "Add your expenses", desc: "Log daily spending with categories and notes." },
  { step: "03", title: "Set budgets", desc: "Define monthly and category-level spending limits." },
  { step: "04", title: "Review & grow", desc: "Analyse charts, download reports and build better habits." }
];

const spendingData = [
  { label: "Food & Dining", amount: "₹4,200", width: "75%", color: "from-orange-400 to-orange-500" },
  { label: "Shopping", amount: "₹6,500", width: "100%", color: "from-blue-400 to-blue-500" },
  { label: "Bills & Utilities", amount: "₹3,450", width: "52%", color: "from-teal-400 to-teal-600" },
  { label: "Travel", amount: "₹4,090", width: "65%", color: "from-purple-400 to-purple-500" },
];

function Home() {
  return (
    <>
      <Navbar />

      <main className="bg-slate-50 relative overflow-x-hidden">

        {/* ═══════════════ HERO ═══════════════ */}
        <section className="relative min-h-screen flex items-center">
          {/* Gradient background */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full bg-teal-100/50 blur-3xl" />
            <div className="absolute top-1/4 -right-40 w-[500px] h-[500px] rounded-full bg-blue-100/40 blur-3xl" />
            <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full bg-emerald-100/30 blur-3xl" />
            <div
              className="absolute inset-0 opacity-[0.025]"
              style={{
                backgroundImage: "radial-gradient(#0f766e 1px, transparent 1px)",
                backgroundSize: "32px 32px"
              }}
            />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
            <div className="grid lg:grid-cols-2 gap-16 items-center">

              {/* Left — Copy */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={0}
              >
                <span className="inline-flex items-center gap-2 rounded-full bg-teal-100 text-teal-800 px-4 py-1.5 text-sm font-semibold ring-1 ring-teal-200">
                  <Zap className="w-3.5 h-3.5" />
                  Smart Personal Finance
                </span>

                <h1
                  className="mt-6 text-5xl lg:text-6xl font-bold leading-tight text-slate-900"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  Track Every Rupee.
                  <br />
                  Build Better{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-teal-400">
                    Financial Habits.
                  </span>
                </h1>

                <p className="mt-6 text-lg leading-8 text-slate-600 max-w-lg">
                  GroMo Track gives you a beautiful, effortless way to log expenses,
                  set budgets and understand where your money actually goes.
                </p>

                <div className="mt-10 flex flex-wrap gap-4">
                  <Link
                    to="/signup"
                    className="group inline-flex items-center gap-2 bg-teal-700 hover:bg-teal-800 text-white px-8 py-4 rounded-2xl transition-all shadow-md hover:shadow-xl font-semibold text-base"
                  >
                    Start for Free
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    to="/login"
                    className="inline-flex items-center gap-2 bg-white border border-slate-200 hover:border-teal-300 text-slate-700 hover:text-teal-700 px-8 py-4 rounded-2xl transition-all shadow-sm hover:shadow-md font-semibold text-base"
                  >
                    Sign In
                  </Link>
                </div>

                {/* Social proof */}
                <div className="mt-10 flex items-center gap-4">
                  <div className="flex -space-x-2">
                    {["A", "R", "S", "M", "P"].map((l, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white"
                        style={{ background: ["#0f766e","#3b82f6","#f59e0b","#8b5cf6","#ef4444"][i] }}
                      >
                        {l}
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="flex text-amber-400 text-xs">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">Loved by 500+ users</p>
                  </div>
                </div>
              </motion.div>

              {/* Right — Dashboard Preview Card */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={2}
                className="relative"
              >
                {/* Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-teal-200/30 to-blue-200/20 rounded-3xl blur-2xl scale-95" />

                <div className="relative bg-white rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden">
                  {/* Card header */}
                  <div className="bg-gradient-to-r from-teal-700 to-teal-600 px-6 py-5">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-teal-200 text-xs font-medium uppercase tracking-wider">Monthly Overview</p>
                        <h2
                          className="text-3xl font-bold text-white mt-1"
                          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                          ₹18,240
                        </h2>
                      </div>
                      <div className="bg-white/20 rounded-2xl p-3">
                        <TrendingUp className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <span className="bg-emerald-400/30 text-emerald-200 text-xs px-2 py-0.5 rounded-full font-medium">
                        ↑ 12% vs last month
                      </span>
                    </div>
                  </div>

                  {/* Spending bars */}
                  <div className="p-6 space-y-4">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Top Spending Categories</p>
                    {spendingData.map((item, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-sm mb-1.5">
                          <span className="font-medium text-slate-700">{item.label}</span>
                          <span className="font-bold text-slate-900">{item.amount}</span>
                        </div>
                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: item.width }}
                            transition={{ duration: 1, delay: 0.5 + i * 0.1, ease: "easeOut" }}
                            className={`h-full rounded-full bg-gradient-to-r ${item.color}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Quick stats row */}
                  <div className="border-t border-slate-100 grid grid-cols-3 divide-x divide-slate-100">
                    {[
                      { label: "Budget Left", value: "₹6,760", color: "text-emerald-600" },
                      { label: "Expenses", value: "34", color: "text-blue-600" },
                      { label: "Saved", value: "₹2,100", color: "text-teal-600" },
                    ].map((s, i) => (
                      <div key={i} className="py-4 text-center">
                        <p className={`text-base font-bold ${s.color}`}>{s.value}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{s.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══════════════ FEATURES ═══════════════ */}
        <section
          id="features"
          className="relative bg-white border-t border-slate-200/60 py-24"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center max-w-2xl mx-auto mb-16"
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-teal-50 text-teal-700 px-4 py-1.5 text-sm font-semibold ring-1 ring-teal-100 mb-4">
                Everything You Need
              </span>
              <h2
                className="text-4xl font-bold text-slate-900"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Powerful tools for smarter money management
              </h2>
              <p className="mt-4 text-slate-500 text-lg">
                Built for Indians who want to take full control of their personal finances.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((f, i) => {
                const Icon = f.icon;
                return (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={i * 0.5}
                    whileHover={{ y: -6, transition: { duration: 0.2 } }}
                    className="group bg-white border border-slate-200 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all cursor-default"
                  >
                    <div className={`w-14 h-14 rounded-2xl ${f.bg} ${f.text} ring-2 ${f.ring} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3
                      className="text-xl font-semibold text-slate-900 mb-3"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {f.title}
                    </h3>
                    <p className="text-slate-500 leading-relaxed text-sm">{f.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══════════════ HOW IT WORKS ═══════════════ */}
        <section className="py-24 bg-slate-50 border-t border-slate-200/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center max-w-xl mx-auto mb-16"
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 text-blue-700 px-4 py-1.5 text-sm font-semibold ring-1 ring-blue-100 mb-4">
                How It Works
              </span>
              <h2
                className="text-4xl font-bold text-slate-900"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Up and running in minutes
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-6 relative">
              {/* Connector line */}
              <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-teal-200 via-blue-200 to-purple-200" />

              {steps.map((step, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i * 0.6}
                  className="relative text-center"
                >
                  <div className="relative w-20 h-20 rounded-2xl bg-white border-2 border-slate-200 flex items-center justify-center mx-auto mb-5 shadow-md">
                    <span
                      className="text-2xl font-bold text-teal-600"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {step.step}
                    </span>
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-500">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════ ABOUT ═══════════════ */}
        <section
          id="about"
          className="py-24 bg-white border-t border-slate-200/60"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <span className="inline-flex items-center gap-2 rounded-full bg-orange-50 text-orange-700 px-4 py-1.5 text-sm font-semibold ring-1 ring-orange-100 mb-6">
                  About GroMo Track
                </span>
                <h2
                  className="text-4xl font-bold text-slate-900 leading-tight"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  Built to help you grow your financial confidence
                </h2>
                <p className="mt-6 text-slate-500 leading-relaxed text-lg">
                  GroMo Track was built for everyday Indians who want a simple, beautiful way to understand
                  and manage their money — without complex spreadsheets or expensive software.
                </p>
                <p className="mt-4 text-slate-500 leading-relaxed">
                  We believe financial clarity shouldn't be hard to achieve. With intuitive expense tracking,
                  insightful analytics and smart budgeting — GroMo Track helps you build the financial habits
                  that lead to real financial freedom.
                </p>

                <ul className="mt-8 space-y-3">
                  {[
                    "100% free to use — no hidden fees",
                    "Your data stays on your device — full privacy",
                    "Works offline with PWA support",
                    "Export and own your financial data anytime",
                  ].map((point, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-600">
                      <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-10 flex flex-wrap gap-4">
                  <Link
                    to="/signup"
                    className="inline-flex items-center gap-2 bg-teal-700 hover:bg-teal-800 text-white px-8 py-4 rounded-2xl font-semibold transition-all shadow-md hover:shadow-xl"
                  >
                    Get Started Free
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>

              {/* Stats grid */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={2}
                className="grid grid-cols-2 gap-4"
              >
                {[
                  { label: "Active Users", value: "500+", sub: "and growing", icon: "👥" },
                  { label: "Expenses Tracked", value: "12K+", sub: "every month", icon: "📊" },
                  { label: "Reports Generated", value: "2K+", sub: "downloaded", icon: "📄" },
                  { label: "Budget Accuracy", value: "94%", sub: "of goals hit", icon: "🎯" },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="bg-slate-50 border border-slate-200 rounded-2xl p-6 hover:border-teal-200 hover:bg-teal-50/30 transition-all"
                  >
                    <div className="text-3xl mb-3">{stat.icon}</div>
                    <p
                      className="text-3xl font-bold text-slate-900"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {stat.value}
                    </p>
                    <p className="text-sm font-medium text-slate-700 mt-1">{stat.label}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{stat.sub}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══════════════ CTA ═══════════════ */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-700 via-teal-600 to-emerald-700" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-800/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
              backgroundSize: "24px 24px"
            }}
          />

          <div className="relative max-w-4xl mx-auto px-6 py-24 text-center">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-1.5 rounded-full text-sm font-semibold mb-6 ring-1 ring-white/30">
                <Download className="w-3.5 h-3.5" />
                Free. No credit card needed.
              </div>
              <h2
                className="text-4xl md:text-5xl font-bold text-white leading-tight"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Take control of your
                <br />
                financial future today.
              </h2>
              <p className="mt-6 text-teal-100 text-lg max-w-2xl mx-auto">
                Join hundreds of users who track smarter, spend better and save more with GroMo Track.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Link
                  to="/signup"
                  className="group inline-flex items-center gap-2 bg-white text-teal-800 hover:bg-slate-50 px-10 py-4 rounded-2xl font-semibold text-base shadow-xl hover:shadow-2xl transition-all"
                >
                  Create Free Account
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 bg-teal-800/40 hover:bg-teal-800/60 text-white px-10 py-4 rounded-2xl font-semibold text-base ring-1 ring-white/20 transition-all"
                >
                  Sign In
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Home;