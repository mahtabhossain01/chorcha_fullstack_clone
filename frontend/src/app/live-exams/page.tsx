'use client'

import Link from 'next/link'
import { Clock, Award, ArrowLeft, Users } from 'lucide-react'

export default function LiveExamsPage() {
  const liveExams = [
    {
      id: '1',
      title: 'BCS Preliminary Model Test 2026',
      duration: '60 mins',
      questions: 100,
      participants: 1240,
      status: 'Live',
      startTime: 'Ongoing now',
    },
    {
      id: '2',
      title: 'Bank Officer (General) Mock Test',
      duration: '45 mins',
      questions: 80,
      participants: 850,
      status: 'Upcoming',
      startTime: 'Starts in 2 hours',
    },
    {
      id: '3',
      title: 'University Admission ICT & Science Special',
      duration: '30 mins',
      questions: 50,
      participants: 2100,
      status: 'Upcoming',
      startTime: 'Tomorrow at 10:00 AM',
    },
  ]

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-slate-600 hover:text-indigo-600 flex items-center gap-1 text-sm font-medium">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <span className="text-slate-300">|</span>
          <h1 className="font-bold text-xl text-slate-900">Live Exams</h1>
        </div>
      </header>

      <main className="flex-1 max-w-5xl w-full mx-auto p-6 md:p-12 space-y-6">
        <div className="bg-indigo-600 text-white rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
          <div className="space-y-2 text-center md:text-left">
            <span className="bg-indigo-500/50 text-indigo-100 text-xs px-3 py-1 rounded-full font-semibold">Competitive Arena</span>
            <h2 className="text-2xl md:text-3xl font-bold">Participate & Test Your Preparation</h2>
            <p className="text-indigo-100 text-sm md:text-base max-w-xl">
              Compete with thousands of students in real-time, get instant score evaluations, and check national merit rankings.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-800">Available & Upcoming Exams</h3>
          
          <div className="grid grid-cols-1 gap-4">
            {liveExams.map((exam) => (
              <div key={exam.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-indigo-300 transition">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      exam.status === 'Live' ? 'bg-emerald-100 text-emerald-700 animate-pulse' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {exam.status}
                    </span>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {exam.startTime}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-slate-900">{exam.title}</h4>
                  <div className="flex flex-wrap gap-4 text-xs text-slate-600">
                    <span>Duration: <strong>{exam.duration}</strong></span>
                    <span>Questions: <strong>{exam.questions} MCQs</strong></span>
                    <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {exam.participants} Registered</span>
                  </div>
                </div>

                <button
                  onClick={() => alert('Exam portal connection will open when backend live exam starts.')}
                  className={`px-5 py-2.5 rounded-xl text-sm font-medium transition ${
                    exam.status === 'Live' 
                      ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm' 
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {exam.status === 'Live' ? 'Join Live Exam' : 'Register / View Details'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
