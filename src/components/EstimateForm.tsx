"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MessageCircle } from "lucide-react";
import { siteConfig, waLink } from "@/lib/site";
import { serviceDetails } from "@/content/home";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  phone: z
    .string()
    .regex(/^[0-9+\s-]{10,15}$/, "Enter a valid phone number"),
  location: z.string().min(2, "Please enter your location or area"),
  service: z.string().min(1, "Please choose a service"),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

const inputCls =
  "w-full rounded-xl border border-cool bg-surface px-4 py-3 text-sm text-ink placeholder:text-ink-muted/60 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20";

const labelCls = "mb-1.5 block text-sm font-semibold text-navy";

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="mt-1 text-xs font-medium text-red-500">{msg}</p>;
}

/**
 * Free-estimate form → WhatsApp. Builds a prefilled message and opens
 * wa.me so the lead lands straight in the business's WhatsApp.
 */
export function EstimateForm() {
  const [waUrl, setWaUrl] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = (values: FormValues) => {
    const lines = [
      `Hi ${siteConfig.name}, I'd like a free estimate.`,
      `Name: ${values.name}`,
      `Phone: ${values.phone}`,
      `Location: ${values.location}`,
      `Service: ${values.service}`,
    ];
    if (values.message?.trim()) lines.push(`Details: ${values.message.trim()}`);
    const url = waLink(lines.join("\n"));
    setWaUrl(url);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  if (waUrl) {
    return (
      <div className="rounded-3xl border border-cool bg-ice p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366]/15 text-[#128C7E]">
          <MessageCircle className="h-6 w-6" />
        </div>
        <p className="mt-4 font-display text-xl font-bold text-navy">
          Thanks — your request is ready.
        </p>
        <p className="mt-2 text-sm text-ink-muted">
          We&apos;ve opened WhatsApp with your details prefilled. Just press send.
        </p>
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-105"
        >
          <MessageCircle className="h-4 w-4" />
          Continue on WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelCls}>
            Name
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            placeholder="Your name"
            className={inputCls}
            {...register("name")}
          />
          <FieldError msg={errors.name?.message} />
        </div>

        <div>
          <label htmlFor="phone" className={labelCls}>
            Phone
          </label>
          <input
            id="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="Your phone number"
            className={inputCls}
            {...register("phone")}
          />
          <FieldError msg={errors.phone?.message} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="location" className={labelCls}>
            Location
          </label>
          <input
            id="location"
            type="text"
            autoComplete="address-level2"
            placeholder="e.g. Kuthuparamba"
            className={inputCls}
            {...register("location")}
          />
          <FieldError msg={errors.location?.message} />
        </div>

        <div>
          <label htmlFor="service" className={labelCls}>
            Service
          </label>
          <select id="service" className={cn(inputCls, "appearance-none")} {...register("service")}>
            <option value="">Choose a service…</option>
            {serviceDetails.map((s) => (
              <option key={s.slug} value={s.name}>
                {s.name}
              </option>
            ))}
            <option value="Other">Other</option>
          </select>
          <FieldError msg={errors.service?.message} />
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelCls}>
          Message <span className="font-normal text-ink-muted">(optional)</span>
        </label>
        <textarea
          id="message"
          rows={4}
          placeholder="Tell us about the space — size, condition, anything specific…"
          className={cn(inputCls, "resize-none")}
          {...register("message")}
        />
      </div>

      <button
        type="submit"
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-brand via-electric to-brand-light px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition hover:brightness-105 sm:w-auto"
      >
        <MessageCircle className="h-4 w-4" />
        Request Free Estimate
      </button>
    </form>
  );
}
