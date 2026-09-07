import Link from 'next/link'
import { BookOpen, Award, Brain, Clock, CheckCircle } from 'lucide-react'

export default function Home() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center p-6 md:p-24 bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      <div className="max-w-4xl w-full text-center space-y-8">
        <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-medium">
          <Award className="w-4 h-4" /> Welcome to Chorcha
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900">
          Master Your Exams with <span className="text-indigo-600">Chorcha</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
          Your ultimate platform for live competitive exams, practice tests, AI-powered study assistance, and comprehensive question archives.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 text-left space-y-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-lg text-slate-800">Live Exams</h3>
            <p className="text-sm text-slate-600">Participate in real-time competitive exams with leaderboards and timers.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 text-left space-y-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-lg text-slate-800">Practice & Archive</h3>
            <p className="text-sm text-slate-600">Access thousands of practice questions and previous years' archived exams.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 text-left space-y-3">
            <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <Brain className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-lg text-slate-800">AI Study Tutor</h3>
            <p className="text-sm text-slate-600">Get instant AI-powered explanations and doubt-solving during your prep.</p>
          </div>
        </div>

        <div className="pt-8 flex flex-wrap justify-center gap-4">
          <a
            href="/live-exams"
            className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-xl shadow hover:bg-indigo-700 transition"
          >
            Explore Live Exams
          </a>
          <a
            href="https://github.com/mahtabhossain01/chorcha_fullstack_clone"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-white text-slate-700 font-medium rounded-xl border border-slate-300 hover:bg-slate-50 transition"
          >
            GitHub Repository
          </a>
        </div>
      </div>
    </main>
  )
}
