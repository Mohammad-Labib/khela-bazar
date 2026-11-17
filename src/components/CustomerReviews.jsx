import React from "react";
import { Star, BadgeCheck, Quote } from "lucide-react";

const reviewsData = [
  {
    id: 1,
    name: "Tanvir Ahmed",
    location: "Mirpur, Dhaka",
    rating: 5,
    product: "CA Plus 15000 English Willow Bat",
    comment:
      "Ordered the CA Plus bat for our university tournament. The balance and ping are genuinely top-notch, and it arrived inside Dhaka within 18 hours!",
    initials: "TA",
    date: "3 days ago",
  },
  {
    id: 2,
    name: "Sadia Islam",
    location: "Uttara, Dhaka",
    rating: 5,
    product: "Bangladesh National Fan Edition Jersey",
    comment:
      "Fabric quality is super breathable and the stitching looks completely authentic. Bought two jerseys using the KHELA25 promo code—totally worth it.",
    initials: "SI",
    date: "1 week ago",
  },
  {
    id: 3,
    name: "Rakibul Hasan",
    location: "Agrabad, Chattogram",
    rating: 5,
    product: "FIFA Quality Pro Match Football",
    comment:
      "Best sports store online right now. Packaging was secure, Cash on Delivery worked smoothly, and the ball grip on wet turf is impressive.",
    initials: "RH",
    date: "2 weeks ago",
  },
];

export default function CustomerReviews() {
  return (
    <section className="py-16 sm:py-20 bg-slate-900/50 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header + Rating Summary */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-emerald-400 text-xs sm:text-sm font-bold uppercase tracking-wider">
              Trusted by Players Nationwide
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mt-1">
              What Our Customers Say
            </h2>
          </div>

          {/* Overall Rating Pill */}
          <div className="inline-flex items-center gap-4 bg-slate-950 border border-slate-800 px-5 py-3 rounded-2xl">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 text-amber-400 fill-amber-400"
                />
              ))}
            </div>
            <div className="text-sm">
              <span className="font-extrabold text-white">4.9 / 5.0</span>
              <span className="text-slate-400 ml-1.5">(2,400+ Reviews)</span>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviewsData.map((review) => (
            <div
              key={review.id}
              className="relative bg-slate-950 border border-slate-800 hover:border-emerald-500/40 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 shadow-lg"
            >
              {/* Decorative Quote Icon */}
              <Quote className="w-8 h-8 text-emerald-500/15 absolute top-5 right-5" />

              <div>
                {/* Star Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(review.rating)].map((_, idx) => (
                    <Star
                      key={idx}
                      className="w-4 h-4 text-amber-400 fill-amber-400"
                    />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-sm text-slate-300 leading-relaxed">
                  &ldquo;{review.comment}&rdquo;
                </p>

                {/* Purchased Item Tag */}
                <div className="mt-4 inline-block bg-slate-900 border border-slate-800 text-emerald-400 text-xs font-medium px-3 py-1 rounded-lg">
                  Purchased: {review.product}
                </div>
              </div>

              {/* Reviewer Profile Footer */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Avatar Initials */}
                  <div className="w-10 h-10 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold text-sm flex items-center justify-center shrink-0">
                    {review.initials}
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-sm font-bold text-white">
                        {review.name}
                      </h4>
                      <BadgeCheck
                        className="w-4 h-4 text-emerald-400"
                        title="Verified Buyer"
                      />
                    </div>
                    <p className="text-xs text-slate-400">{review.location}</p>
                  </div>
                </div>

                <span className="text-xs text-slate-500">{review.date}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}