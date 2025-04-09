import { Feature, Step } from "./types";

export const colorSets = [
    {
        bg: "bg-yellow-100",
        border: "border-yellow-200",
        icon: "text-yellow-400",
    },
    {
        bg: "bg-purple-100",
        border: "border-purple-200",
        icon: "text-purple-400",
    },
    {
        bg: "bg-orange-100",
        border: "border-orange-200",
        icon: "text-orange-400",
    },
    { bg: "bg-pink-100", border: "border-pink-200", icon: "text-pink-400" },
    { bg: "bg-blue-100", border: "border-blue-200", icon: "text-blue-400" },
    { bg: "bg-green-100", border: "border-green-200", icon: "text-green-400" },
];

export const colorSetsMembers = [
    // Yellow shades
    {
        bg: "bg-yellow-100",
        border: "border-yellow-200",
        icon: "text-yellow-400",
    },
    {
        bg: "bg-yellow-50",
        border: "border-yellow-100",
        icon: "text-yellow-500",
    },
    { bg: "bg-amber-100", border: "border-amber-200", icon: "text-amber-400" },

    // Blue shades
    { bg: "bg-blue-100", border: "border-blue-200", icon: "text-blue-400" },
    { bg: "bg-blue-50", border: "border-blue-100", icon: "text-blue-500" },
    { bg: "bg-sky-100", border: "border-sky-200", icon: "text-sky-400" },

    // Green shades
    { bg: "bg-green-100", border: "border-green-200", icon: "text-green-400" },
    { bg: "bg-green-50", border: "border-green-100", icon: "text-green-500" },
    {
        bg: "bg-emerald-100",
        border: "border-emerald-200",
        icon: "text-emerald-400",
    },

    // Pink shades
    { bg: "bg-pink-100", border: "border-pink-200", icon: "text-pink-400" },
    { bg: "bg-pink-50", border: "border-pink-100", icon: "text-pink-500" },
    { bg: "bg-rose-100", border: "border-rose-200", icon: "text-rose-400" },

    // Purple shades
    {
        bg: "bg-purple-100",
        border: "border-purple-200",
        icon: "text-purple-400",
    },
    {
        bg: "bg-purple-50",
        border: "border-purple-100",
        icon: "text-purple-500",
    },
    {
        bg: "bg-violet-100",
        border: "border-violet-200",
        icon: "text-violet-400",
    },

    // Orange shades
    {
        bg: "bg-orange-100",
        border: "border-orange-200",
        icon: "text-orange-400",
    },
    {
        bg: "bg-orange-50",
        border: "border-orange-100",
        icon: "text-orange-500",
    },
    { bg: "bg-amber-100", border: "border-amber-200", icon: "text-amber-400" },

    // Teal shades
    { bg: "bg-teal-100", border: "border-teal-200", icon: "text-teal-400" },
    { bg: "bg-teal-50", border: "border-teal-100", icon: "text-teal-500" },
    { bg: "bg-cyan-100", border: "border-cyan-200", icon: "text-cyan-400" },
];

export const features: Feature[] = [
    {
        icon: "✏️",
        title: "Customizable Questions",
        description: "Create your own unique questions along with some pre defined questions."
    },
    {
        icon: "🔒",
        title: "Private Sharing",
        description: "Share your slambook with only the friends you choose through secure invites."
    },
    {
        icon: "📱",
        title: "Mobile Friendly",
        description: "Access and update your slambook from any device, anytime, anywhere."
    },


    {
        icon: "🔔",
        title: "Notifications",
        description: "Your friend gets notified when you send an invite to your team."
    }
];

export const steps: Step[] = [
    {
        number: 1,
        title: "Create Account",
        description: "Sign up for free and start your journey."
    },
    {
        number: 2,
        title: "Create your team",
        description: "Choose a name and create your team."
    },
    {
        number: 3,
        title: "Invite Friends",
        description: "Invite your friends via email."
    },
    {
        number: 4,
        title: "Collect Memories",
        description: "Create lasting memories together."
    }
];