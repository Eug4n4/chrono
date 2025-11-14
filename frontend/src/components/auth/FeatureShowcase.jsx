import { Calendar, Clock, CheckSquare, Users } from "lucide-react";
import styles from "./FeatureShowcase.module.css";

const FeatureShowcase = () => {
    const features = [
        {
            icon: Calendar,
            title: "Manage Calendars",
            description:
                "Create and organize multiple calendars for different aspects of your life",
        },
        {
            icon: Clock,
            title: "Schedule Events",
            description:
                "Plan your events with intuitive scheduling and time management tools",
        },
        {
            icon: CheckSquare,
            title: "Task Management",
            description: "Keep track of your tasks and boost your productivity",
        },
        {
            icon: Users,
            title: "Share & Collaborate",
            description:
                "Share calendars and collaborate with team members in real-time",
        },
    ];

    return (
        <div className={styles.showcase}>
            <div className={styles.content}>
                <h1 className={styles.title}>Chronos</h1>
                <p className={styles.subtitle}>
                    Your Personal Calendar & Task Manager
                </p>
                <p className={styles.description}>
                    Stay organized and manage your time effectively with our
                    modern calendar application
                </p>

                <div className={styles.featuresGrid}>
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <div key={index} className={styles.featureCard}>
                                <div className={styles.iconWrapper}>
                                    <Icon size={32} className={styles.icon} />
                                </div>
                                <h3 className={styles.featureTitle}>
                                    {feature.title}
                                </h3>
                                <p className={styles.featureDescription}>
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default FeatureShowcase;
