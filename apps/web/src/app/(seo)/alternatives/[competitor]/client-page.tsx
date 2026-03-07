"use client";

import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ShieldCheck,
  Sparkles,
  X,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { Fragment } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Competitor } from "@/data/competitors";

export default function AlternativeClientPage({
  competitor,
}: {
  competitor: Competitor;
}) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen overflow-hidden bg-gray-50 selection:bg-blue-500/30 dark:bg-[#0A0A0A]">
      {/* Ambient background glows */}
      <div className="-translate-x-1/2 pointer-events-none absolute top-0 left-1/2 h-[600px] w-full max-w-7xl opacity-40 dark:opacity-20">
        <div className="absolute top-[-20%] left-1/4 h-96 w-96 animate-pulse rounded-full bg-blue-400 mix-blend-multiply blur-[128px] filter" />
        <div className="absolute top-[-10%] right-1/4 h-96 w-96 rounded-full bg-indigo-400 mix-blend-multiply blur-[128px] filter" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container relative z-10 mx-auto max-w-6xl px-4 pt-24 pb-32 sm:px-6 lg:px-8"
      >
        {/* HERO SECTION */}
        <motion.section
          variants={itemVariants}
          className="mx-auto mb-28 max-w-4xl text-center"
        >
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-1.5 font-semibold text-sm shadow-sm dark:border-white/10 dark:bg-white/5">
            <span className="flex h-2 w-2 rounded-full bg-blue-600" />
            <span className="text-gray-600 dark:text-gray-300">
              The Modern Alternative
            </span>
          </div>

          <h1 className="mb-8 font-extrabold font-heading text-5xl text-gray-900 leading-[1.1] tracking-tight md:text-7xl dark:text-white">
            Outgrowing{" "}
            <span className="bg-linear-to-r from-gray-400 to-gray-600 bg-clip-text text-transparent dark:from-gray-500 dark:to-gray-300">
              {competitor.name}
            </span>
            ?<br />
            Upgrade to{" "}
            <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-400">
              resumebuild.cv
            </span>
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-gray-600 text-xl leading-relaxed dark:text-gray-400">
            {competitor.description} For professionals who need{" "}
            <strong className="font-semibold text-gray-900 dark:text-gray-200">
              ATS-optimized results
            </strong>
            , resumebuild.cv is the intelligent upgrade.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/signup"
              className="group relative inline-flex items-center justify-center gap-2 rounded-full border border-transparent bg-blue-600 px-8 py-4 font-semibold text-base text-white shadow-blue-600/20 shadow-lg transition-all duration-300 hover:bg-blue-700 hover:shadow-blue-600/30 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
            >
              Build your resume free
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="#compare"
              className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white px-8 py-4 font-medium text-base text-gray-700 shadow-sm transition-all duration-300 hover:bg-gray-50 hover:shadow-md focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-gray-300 dark:hover:bg-white/10"
            >
              See the comparison
            </Link>
          </div>
        </motion.section>

        {/* SUMMARY / TLDR */}
        <motion.section variants={itemVariants as any} className="mb-32">
          <div className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-8 shadow-gray-200/50 shadow-xl md:p-12 dark:border-white/5 dark:bg-[#111] dark:shadow-none">
            <div className="pointer-events-none absolute top-0 right-0 h-64 w-64 rounded-bl-full bg-linear-to-bl from-blue-500/10 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
            <h2 className="mb-6 flex items-center gap-3 font-bold text-2xl text-gray-900 dark:text-white">
              <Zap className="h-6 w-6 text-indigo-500" />
              The TL;DR
            </h2>
            <p className="font-medium text-gray-700 text-lg leading-relaxed md:text-xl dark:text-gray-300">
              {competitor.tldr}
            </p>
          </div>
        </motion.section>

        {/* COMPARISON TABLE */}
        <motion.section
          variants={itemVariants}
          id="compare"
          className="mb-32 scroll-mt-32"
        >
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-bold font-heading text-3xl text-gray-900 md:text-4xl dark:text-white">
              How do they compare?
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600 text-lg dark:text-gray-400">
              An honest look at feature parity and where resumebuild.cv pulls
              ahead.
            </p>
          </div>

          <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-gray-200/50 shadow-xl dark:border-white/5 dark:bg-[#111] dark:shadow-none">
            <Table>
              <TableHeader className="bg-gray-50/50 dark:bg-white/2">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[33%] min-w-[200px] p-6 font-semibold text-gray-400 text-sm uppercase tracking-wider lg:p-8 dark:text-gray-500">
                    Feature Area
                  </TableHead>
                  <TableHead className="w-[33%] min-w-[200px] p-6 font-bold text-gray-500 text-xl lg:p-8 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-200 text-sm dark:bg-gray-800">
                        {competitor.name.charAt(0)}
                      </div>
                      {competitor.name}
                    </div>
                  </TableHead>
                  <TableHead className="w-[33%] min-w-[200px] p-6 font-bold text-blue-600 text-xl lg:p-8 dark:text-blue-400">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
                        <Sparkles className="h-4 w-4" />
                      </div>
                      resumebuild.cv
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody className="divide-y divide-gray-100 dark:divide-white/5">
                {competitor.features.map((category) => (
                  <Fragment key={category.category}>
                    <TableRow className="bg-gray-50/30 hover:bg-gray-50/30 dark:bg-white/1 dark:hover:bg-white/1">
                      <TableCell
                        colSpan={3}
                        className="px-6 py-4 font-bold text-gray-900 text-lg lg:px-8 dark:text-white"
                      >
                        {category.category}
                      </TableCell>
                    </TableRow>
                    {category.items.map((item) => (
                      <TableRow
                        key={item.name}
                        className="transition-colors hover:bg-gray-50/30 dark:hover:bg-white/1"
                      >
                        <TableCell className="whitespace-normal p-6 align-top font-medium text-gray-700 lg:p-8 dark:text-gray-300">
                          {item.name}
                        </TableCell>

                        <TableCell className="whitespace-normal p-6 align-top lg:p-8">
                          <div className="flex h-full items-start gap-3 p-4 text-gray-600 dark:text-gray-400">
                            <span className="leading-relaxed">
                              {item.competitorSupport}
                            </span>
                          </div>
                        </TableCell>

                        <TableCell className="whitespace-normal p-6 align-top lg:p-8">
                          <div className="relative flex h-full items-start gap-3 p-4 text-blue-900 dark:text-blue-100">
                            <span className="font-medium leading-relaxed">
                              {item.resumebuildSupport}
                            </span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </Fragment>
                ))}
              </TableBody>
            </Table>
          </div>
        </motion.section>

        {/* TWO-COLUMN: WHO IS IT FOR */}
        <motion.section
          variants={itemVariants as any}
          className="mb-32 grid grid-cols-1 gap-8 lg:grid-cols-2"
        >
          <div className="relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-8 shadow-gray-200/50 shadow-xl md:p-12 dark:border-white/5 dark:bg-[#111] dark:shadow-none">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 dark:bg-white/5">
              <ShieldCheck className="h-6 w-6 text-gray-500" />
            </div>
            <h3 className="mb-4 font-bold text-2xl text-gray-900 dark:text-white">
              Who should use {competitor.name}?
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed dark:text-gray-400">
              {competitor.idealFor}
            </p>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-transparent bg-linear-to-br from-blue-600 to-indigo-700 p-8 text-white shadow-blue-500/20 shadow-xl md:p-12 dark:border-blue-500/20 dark:from-blue-900/40 dark:to-indigo-900/40 dark:shadow-none">
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay" />
            <div className="-right-16 -top-16 absolute h-64 w-64 rounded-full bg-white/10 blur-3xl" />

            <div className="relative z-10 mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <h3 className="relative z-10 mb-4 font-bold text-2xl text-white">
              Who is resumebuild.cv best for?
            </h3>
            <p className="relative z-10 font-medium text-blue-100 text-lg leading-relaxed">
              {competitor.resumebuildIdealFor}
            </p>
          </div>
        </motion.section>

        {/* TESTIMONIALS */}
        {competitor.testimonials.length > 0 && (
          <motion.section variants={itemVariants as any} className="mb-32">
            <h2 className="mb-12 text-center font-bold font-heading text-3xl text-gray-900 md:text-4xl dark:text-white">
              What switchers are saying
            </h2>
            <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8">
              {competitor.testimonials.map((testimonial) => (
                <div
                  key={testimonial.author}
                  className="relative rounded-3xl border border-gray-100 bg-white p-8 shadow-gray-200/50 shadow-xl md:p-10 dark:border-white/5 dark:bg-[#111] dark:shadow-none"
                >
                  <div className="-top-4 -left-4 absolute font-serif text-6xl text-blue-200 leading-none dark:text-blue-900/50">
                    "
                  </div>
                  <p className="relative z-10 mb-8 font-medium text-gray-800 text-xl leading-relaxed md:text-2xl dark:text-gray-200">
                    {testimonial.quote}
                  </p>
                  <div className="relative z-10 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-indigo-500 font-bold text-lg text-white shadow-inner">
                      {testimonial.author.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 dark:text-white">
                        {testimonial.author}
                      </div>
                      <div className="font-medium text-blue-600 dark:text-blue-400">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* CTA / MIGRATION */}
        <motion.section
          variants={itemVariants as any}
          className="relative overflow-hidden rounded-[2.5rem] border border-gray-800 bg-gray-900 p-10 text-center md:p-20 dark:border-white/10 dark:bg-white/[0.03]"
        >
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay" />
          <div className="-translate-x-1/2 -translate-y-1/2 pointer-events-none absolute top-1/2 left-1/2 h-[800px] w-[800px] rounded-full bg-blue-500/20 blur-[120px]" />

          <div className="relative z-10">
            <h2 className="mb-6 font-extrabold font-heading text-4xl text-white tracking-tight md:text-5xl">
              Ready to switch from {competitor.name}?
            </h2>
            <p className="mx-auto mb-12 max-w-3xl text-gray-400 text-xl">
              Bring your data over and let our AI breathe new life into your
              career story. It takes less than 5 minutes.
            </p>

            <div className="mx-auto mb-12 max-w-4xl rounded-3xl border border-gray-700 bg-gray-800/50 p-8 backdrop-blur-sm dark:border-white/5 dark:bg-black/40">
              <div className="grid grid-cols-1 gap-10 text-left md:grid-cols-2">
                <div>
                  <h4 className="mb-6 flex items-center gap-3 font-semibold text-lg text-white">
                    <Check className="h-6 w-6 rounded-full bg-green-400/10 p-1 text-green-400" />
                    What easily transfers
                  </h4>
                  <ul className="space-y-4 text-gray-300">
                    {competitor.migration.transferable.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-1 shrink-0 text-gray-600 dark:text-gray-500">
                          •
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="mb-6 flex items-center gap-3 font-semibold text-lg text-white">
                    <ArrowUpRight className="h-6 w-6 rounded-full bg-blue-400/10 p-1 text-blue-400" />
                    What instantly improves
                  </h4>
                  <ul className="space-y-4 text-gray-300">
                    {competitor.migration.reconfiguration.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-1 shrink-0 text-gray-600 dark:text-gray-500">
                          •
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="px-4">
              <Link
                href="/signup"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-4 font-bold text-base text-gray-900 shadow-white/10 shadow-xl transition-all hover:scale-[1.02] hover:bg-gray-100 hover:shadow-white/20 active:scale-95 sm:w-auto sm:px-10 sm:py-5 sm:text-lg"
              >
                <span className="shrink-0 text-center">
                  Start using resumebuild.cv
                </span>
                <ArrowRight className="h-5 w-5 shrink-0" />
              </Link>
            </div>
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
}
