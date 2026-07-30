import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

function Home() {
  return (
    <>
      <Navbar />

      <main className="bg-slate-50">

  {/* Hero Section */}
  <section className="max-w-7xl mx-auto px-6 py-28 text-center">

    <span className="inline-block bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium">
      💰 Smart Personal Finance Tracker
    </span>

    <h1 className="mt-8 text-6xl font-extrabold text-slate-800 leading-tight">
      Track Every Rupee.
      <br />
      <span className="text-emerald-600">
        Grow Every Month.
      </span>
    </h1>

    <p className="mt-8 text-lg text-slate-500 max-w-3xl mx-auto">
      GroMo Track helps you manage expenses, analyze spending habits,
      generate insightful reports, and build better financial discipline —
      all in one place.
    </p>

    <div className="mt-12 flex justify-center gap-5">

      <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-semibold transition">
        Get Started
      </button>

      <button className="border border-slate-300 hover:bg-slate-100 px-8 py-4 rounded-xl font-semibold transition">
        Learn More
      </button>

    </div>

  </section>
  {/* Features */}

<section className="max-w-7xl mx-auto px-6 py-20">

  <h2 className="text-4xl font-bold text-center text-slate-800">
    Everything You Need
  </h2>

  <p className="text-center text-slate-500 mt-4">
    Powerful tools to manage your finances efficiently.
  </p>

  <div className="grid md:grid-cols-3 gap-8 mt-14">

    <div className="bg-white rounded-2xl shadow-lg p-8 hover:-translate-y-2 transition">

      <h3 className="text-2xl font-bold text-emerald-600">
        Expense Tracking
      </h3>

      <p className="mt-4 text-slate-500">
        Record every expense with categories and monthly history.
      </p>

    </div>

    <div className="bg-white rounded-2xl shadow-lg p-8 hover:-translate-y-2 transition">

      <h3 className="text-2xl font-bold text-emerald-600">
        Analytics
      </h3>

      <p className="mt-4 text-slate-500">
        Weekly, monthly and yearly spending analysis using charts.
      </p>

    </div>

    <div className="bg-white rounded-2xl shadow-lg p-8 hover:-translate-y-2 transition">

      <h3 className="text-2xl font-bold text-emerald-600">
        Reports
      </h3>

      <p className="mt-4 text-slate-500">
        Export your expenses as PDF, Excel or CSV anytime.
      </p>

    </div>

  </div>

</section>

</main>

      <Footer />
    </>
  );
}

export default Home;