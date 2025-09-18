import { cn } from "@/shared/cn";
import Image from "next/image";
import Link from "next/link";
import { toneClasses, type ToneName } from "@/presentation/components/ui/CardMosaic";

export interface TimeLineSchema {
    image: string;
    title: string;
    description: string;
    cta?: {
      label: string;
      href: string;
    };
    brand?: string;
    tone?: ToneName;
}

export interface TimelineRecommendationProps {
  items: TimeLineSchema[];
}

export const TimeLine = ({ items }: TimelineRecommendationProps) => {
  // Map estático de colores para el nodo/hover y borde activo, usando la paleta tone
  const dotBg: Record<ToneName, string> = {
    brand: "bg-brand-500",
    blue: "bg-tone-blue-500",
    teal: "bg-tone-teal-500",
    green: "bg-tone-green-500",
    violet: "bg-tone-violet-500",
    coral: "bg-tone-coral-500",
    sun: "bg-tone-sun-500",
    warm: "bg-tone-warm-500",
    muted: "bg-tone-muted-500",
  };
  const dotHoverBg: Record<ToneName, string> = {
    brand: "group-hover:bg-brand-600",
    blue: "group-hover:bg-tone-blue-600",
    teal: "group-hover:bg-tone-teal-600",
    green: "group-hover:bg-tone-green-600",
    violet: "group-hover:bg-tone-violet-600",
    coral: "group-hover:bg-tone-coral-600",
    sun: "group-hover:bg-tone-sun-600",
    warm: "group-hover:bg-tone-warm-600",
    muted: "group-hover:bg-tone-muted-600",
  };
  const activeBorder: Record<ToneName, string> = {
    brand: "group-[.is-active]:border-brand-500",
    blue: "group-[.is-active]:border-tone-blue-500",
    teal: "group-[.is-active]:border-tone-teal-500",
    green: "group-[.is-active]:border-tone-green-500",
    violet: "group-[.is-active]:border-tone-violet-500",
    coral: "group-[.is-active]:border-tone-coral-500",
    sun: "group-[.is-active]:border-tone-sun-500",
    warm: "group-[.is-active]:border-tone-warm-500",
    muted: "group-[.is-active]:border-tone-muted-500",
  };
  return (
    <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:-translate-x-px before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent md:before:mx-auto md:before:translate-x-0">
      {items.map((item, index) => {
        const tone = item.tone || ("brand" as ToneName);
        const colors = toneClasses[tone];
        return (
          <div
            key={index}
            className={cn(
              "relative flex items-center md:justify-between md:odd:flex-row-reverse group",
              "is-active"
            )}
          >
            {/* Timeline ball */}
            <div className={cn(
              "flex items-center justify-center w-10 h-10 rounded-full border-2 bg-surface-0 shadow-md md:mx-auto border-slate-300",
              activeBorder[tone]
            )}>
              <span className={cn(
                "w-3 h-3 rounded-full transition duration-150 ease-in-out",
                dotBg[tone],
                dotHoverBg[tone]
              )}></span>
            </div>

            {/* Card */}
            <div className={cn(
              "w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)]",
              "p-4 rounded-lg border border-slate-200",
              "bg-surface-0 shadow-sm hover:shadow-md",
              "transition duration-150 ease-in-out"
            )}>
              <div className="flex flex-col md:flex-row gap-4">
                {/* Image container */}
                <div className="relative w-full md:w-24 h-24 rounded-lg overflow-hidden shrink-0">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                  {item.brand && (
                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/50 backdrop-blur-sm">
                      <p className="text-xs text-white text-center font-medium">
                        {item.brand}
                      </p>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-grow space-y-2">
                  <h3 className={cn(
                    "text-lg font-semibold",
                    colors.accent
                  )}>
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-sm">
                    {item.description}
                  </p>
                  {item.cta && (
                    <div className="pt-2">
                      <Link
                        href={item.cta.href}
                        className={cn(
                          "inline-flex items-center text-sm font-medium",
                          colors.cta
                        )}
                      >
                        {item.cta.label}
                        <svg
                          className="w-4 h-4 ml-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
