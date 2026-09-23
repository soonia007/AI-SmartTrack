import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";

type Tab = "home" | "mail" | "calendar" | "tasks" | "profile";

const COLORS = {
  background: "#F6F7FB",
  card: "#FFFFFF",
  text: "#111827",
  subtext: "#6B7280",
  primary: "#5B5FEF",
  primarySoft: "#ECECFF",
  border: "#E5E7EB",
  green: "#16A34A",
  greenSoft: "#DCFCE7",
  red: "#DC2626",
  redSoft: "#FEE2E2",
  orange: "#EA580C",
  orangeSoft: "#FFEDD5",
};

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [tab, setTab] = useState<Tab>("home");

  if (!loggedIn) {
    return (
      <>
        <StatusBar style="dark" />
        <LoginScreen onLogin={() => setLoggedIn(true)} />
      </>
    );
  }

  return (
    <SafeAreaView style={styles.app}>
      <StatusBar style="dark" />

      <View style={styles.screen}>
        {tab === "home" && <HomeScreen />}
        {tab === "mail" && <MailScreen />}
        {tab === "calendar" && <CalendarScreen />}
        {tab === "tasks" && <TasksScreen />}
        {tab === "profile" && (
          <ProfileScreen onLogout={() => setLoggedIn(false)} />
        )}
      </View>

      <BottomNavigation tab={tab} setTab={setTab} />
    </SafeAreaView>
  );
}

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  return (
    <SafeAreaView style={styles.loginContainer}>
      <View style={styles.loginTop}>
        <View style={styles.logo}>
          <Ionicons name="sparkles" size={30} color="#FFFFFF" />
        </View>

        <Text style={styles.brand}>Work OS</Text>

        <Text style={styles.loginTitle}>
          One place for your{"\n"}entire workday.
        </Text>

        <Text style={styles.loginSubtitle}>
          Connect Gmail, Calendar, Drive and Tasks. Let AI help organize what
          matters.
        </Text>
      </View>

      <View style={styles.loginBottom}>
        <Pressable style={styles.googleButton} onPress={onLogin}>
          <View style={styles.googleIcon}>
            <Text style={styles.googleLetter}>G</Text>
          </View>

          <Text style={styles.googleButtonText}>Continue with Google</Text>
        </Pressable>

        <Text style={styles.terms}>
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </Text>
      </View>
    </SafeAreaView>
  );
}

function Header({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.pageTitle}>{title}</Text>
        {subtitle && <Text style={styles.pageSubtitle}>{subtitle}</Text>}
      </View>

      <Pressable style={styles.avatar}>
        <Text style={styles.avatarText}>KP</Text>
      </Pressable>
    </View>
  );
}

function HomeScreen() {
  return (
    <ScrollView
      style={styles.page}
      contentContainerStyle={styles.pageContent}
      showsVerticalScrollIndicator={false}
    >
      <Header title="Good morning 👋" subtitle="Thursday, September 24" />

      <View style={styles.aiCard}>
        <View style={styles.aiIcon}>
          <Ionicons name="sparkles" size={22} color="#FFFFFF" />
        </View>

        <View style={styles.aiContent}>
          <Text style={styles.aiLabel}>AI DAILY BRIEF</Text>

          <Text style={styles.aiTitle}>
            You have 3 important items today
          </Text>

          <Text style={styles.aiDescription}>
            One meeting at 10:30, two emails need replies and one overdue task.
          </Text>

          <Pressable style={styles.aiButton}>
            <Text style={styles.aiButtonText}>View my day</Text>
            <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
          </Pressable>
        </View>
      </View>

      <SectionTitle title="Today" action="View all" />

      <View style={styles.summaryRow}>
        <SummaryCard
          icon="mail-outline"
          count="12"
          label="Unread"
          color={COLORS.primary}
        />

        <SummaryCard
          icon="calendar-outline"
          count="4"
          label="Meetings"
          color={COLORS.orange}
        />

        <SummaryCard
          icon="checkbox-outline"
          count="7"
          label="Tasks"
          color={COLORS.green}
        />
      </View>

      <SectionTitle title="Next meeting" />

      <View style={styles.meetingCard}>
        <View style={styles.timeBlock}>
          <Text style={styles.timeText}>10:30</Text>
          <Text style={styles.timePeriod}>AM</Text>
        </View>

        <View style={styles.meetingDivider} />

        <View style={styles.meetingInfo}>
          <Text style={styles.meetingTitle}>Product Weekly Sync</Text>

          <View style={styles.rowCenter}>
            <Ionicons
              name="videocam-outline"
              size={15}
              color={COLORS.subtext}
            />
            <Text style={styles.smallText}> Google Meet · 45 min</Text>
          </View>

          <View style={styles.peopleRow}>
            <MiniAvatar label="AM" />
            <MiniAvatar label="JK" />
            <MiniAvatar label="SN" />
            <View style={styles.moreAvatar}>
              <Text style={styles.moreAvatarText}>+4</Text>
            </View>
          </View>
        </View>
      </View>

      <SectionTitle title="Needs your attention" />

      <AttentionItem
        icon="mail"
        title="Budget approval request"
        subtitle="Sarah · 14 minutes ago"
        tag="Reply"
      />

      <AttentionItem
        icon="checkbox"
        title="Submit Q3 expense report"
        subtitle="Due today"
        tag="Task"
      />

      <AttentionItem
        icon="calendar"
        title="Design review moved to 3 PM"
        subtitle="Calendar updated"
        tag="Update"
      />

      <View style={{ height: 110 }} />
    </ScrollView>
  );
}

function SummaryCard({
  icon,
  count,
  label,
  color,
}: {
  icon: any;
  count: string;
  label: string;
  color: string;
}) {
  return (
    <View style={styles.summaryCard}>
      <View style={[styles.summaryIcon, { backgroundColor: `${color}15` }]}>
        <Ionicons name={icon} size={20} color={color} />
      </View>

      <Text style={styles.summaryCount}>{count}</Text>
      <Text style={styles.summaryLabel}>{label}</Text>
    </View>
  );
}

function SectionTitle({
  title,
  action,
}: {
  title: string;
  action?: string;
}) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {action && <Text style={styles.sectionAction}>{action}</Text>}
    </View>
  );
}

function AttentionItem({
  icon,
  title,
  subtitle,
  tag,
}: {
  icon: any;
  title: string;
  subtitle: string;
  tag: string;
}) {
  return (
    <Pressable style={styles.attentionItem}>
      <View style={styles.attentionIcon}>
        <Ionicons name={icon} size={20} color={COLORS.primary} />
      </View>

      <View style={styles.flex}>
        <Text style={styles.attentionTitle}>{title}</Text>
        <Text style={styles.attentionSubtitle}>{subtitle}</Text>
      </View>

      <View style={styles.tag}>
        <Text style={styles.tagText}>{tag}</Text>
      </View>
    </Pressable>
  );
}

function MailScreen() {
  const mails = [
    {
      sender: "Sarah Wilson",
      subject: "Budget approval request",
      preview: "Hi, could you please review the attached...",
      time: "9:42",
      unread: true,
    },
    {
      sender: "Google Calendar",
      subject: "Updated invitation: Design Review",
      preview: "The meeting time has been changed to...",
      time: "8:31",
      unread: true,
    },
    {
      sender: "Alex Morgan",
      subject: "Re: Work OS Prototype",
      preview: "Looks good. I added a few comments...",
      time: "Yesterday",
      unread: false,
    },
    {
      sender: "Finance Team",
      subject: "Monthly expense report",
      preview: "Please submit your September expenses...",
      time: "Yesterday",
      unread: false,
    },
  ];

  return (
    <ScrollView
      style={styles.page}
      contentContainerStyle={styles.pageContent}
      showsVerticalScrollIndicator={false}
    >
      <Header title="Inbox" subtitle="12 unread messages" />

      <View style={styles.searchBox}>
        <Ionicons name="search" size={18} color={COLORS.subtext} />
        <TextInput
          placeholder="Search emails"
          placeholderTextColor="#9CA3AF"
          style={styles.searchInput}
        />
        <Ionicons name="options-outline" size={19} color={COLORS.subtext} />
      </View>

      <View style={styles.filterRow}>
        <FilterChip label="Primary" active />
        <FilterChip label="Unread" />
        <FilterChip label="Important" />
      </View>

      <View style={styles.mailList}>
        {mails.map((mail, index) => (
          <Pressable key={index} style={styles.mailItem}>
            <View
              style={[
                styles.mailAvatar,
                mail.unread && styles.mailAvatarUnread,
              ]}
            >
              <Text
                style={[
                  styles.mailAvatarText,
                  mail.unread && { color: "#FFFFFF" },
                ]}
              >
                {mail.sender[0]}
              </Text>
            </View>

            <View style={styles.mailBody}>
              <View style={styles.mailTopRow}>
                <Text
                  numberOfLines={1}
                  style={[
                    styles.mailSender,
                    mail.unread && styles.boldText,
                  ]}
                >
                  {mail.sender}
                </Text>

                <Text style={styles.mailTime}>{mail.time}</Text>
              </View>

              <Text
                numberOfLines={1}
                style={[
                  styles.mailSubject,
                  mail.unread && styles.boldText,
                ]}
              >
                {mail.subject}
              </Text>

              <Text numberOfLines={1} style={styles.mailPreview}>
                {mail.preview}
              </Text>
            </View>

            {mail.unread && <View style={styles.unreadDot} />}
          </Pressable>
        ))}
      </View>

      <View style={{ height: 110 }} />
    </ScrollView>
  );
}

function FilterChip({
  label,
  active = false,
}: {
  label: string;
  active?: boolean;
}) {
  return (
    <Pressable style={[styles.filterChip, active && styles.filterChipActive]}>
      <Text
        style={[
          styles.filterChipText,
          active && styles.filterChipTextActive,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

function CalendarScreen() {
  return (
    <ScrollView
      style={styles.page}
      contentContainerStyle={styles.pageContent}
      showsVerticalScrollIndicator={false}
    >
      <Header title="Calendar" subtitle="September 2026" />

      <View style={styles.weekCard}>
        {[
          ["MON", "21"],
          ["TUE", "22"],
          ["WED", "23"],
          ["THU", "24"],
          ["FRI", "25"],
        ].map(([day, date]) => {
          const active = date === "24";

          return (
            <Pressable
              key={date}
              style={[styles.dayItem, active && styles.activeDay]}
            >
              <Text
                style={[styles.dayLabel, active && styles.activeDayText]}
              >
                {day}
              </Text>
              <Text
                style={[styles.dayDate, active && styles.activeDayText]}
              >
                {date}
              </Text>
              {active && <View style={styles.dayDot} />}
            </Pressable>
          );
        })}
      </View>

      <SectionTitle title="Thursday, 24 September" />

      <CalendarEvent
        time="09:00"
        end="09:30"
        title="Morning Planning"
        subtitle="Personal"
        color={COLORS.primary}
      />

      <CalendarEvent
        time="10:30"
        end="11:15"
        title="Product Weekly Sync"
        subtitle="Google Meet · 7 attendees"
        color={COLORS.orange}
      />

      <CalendarEvent
        time="15:00"
        end="16:00"
        title="Design Review"
        subtitle="Google Meet · 5 attendees"
        color={COLORS.green}
      />

      <View style={{ height: 110 }} />
    </ScrollView>
  );
}

function CalendarEvent({
  time,
  end,
  title,
  subtitle,
  color,
}: {
  time: string;
  end: string;
  title: string;
  subtitle: string;
  color: string;
}) {
  return (
    <View style={styles.calendarRow}>
      <View style={styles.calendarTime}>
        <Text style={styles.calendarTimeMain}>{time}</Text>
        <Text style={styles.calendarTimeEnd}>{end}</Text>
      </View>

      <View style={[styles.eventCard, { borderLeftColor: color }]}>
        <Text style={styles.eventTitle}>{title}</Text>
        <Text style={styles.eventSubtitle}>{subtitle}</Text>
      </View>
    </View>
  );
}

function TasksScreen() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Submit Q3 expense report", done: false, due: "Today" },
    { id: 2, title: "Review product requirements", done: false, due: "Today" },
    { id: 3, title: "Prepare weekly meeting notes", done: false, due: "Tomorrow" },
    { id: 4, title: "Update Work OS prototype", done: true, due: "Completed" },
  ]);

  const toggleTask = (id: number) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  return (
    <ScrollView
      style={styles.page}
      contentContainerStyle={styles.pageContent}
      showsVerticalScrollIndicator={false}
    >
      <Header title="Tasks" subtitle="3 tasks remaining" />

      <View style={styles.taskOverview}>
        <View>
          <Text style={styles.taskOverviewLabel}>TODAY'S PROGRESS</Text>
          <Text style={styles.taskOverviewTitle}>4 of 7 completed</Text>
        </View>

        <View style={styles.progressCircle}>
          <Text style={styles.progressText}>57%</Text>
        </View>
      </View>

      <SectionTitle title="My tasks" action="+ Add task" />

      {tasks.map((task) => (
        <Pressable
          key={task.id}
          style={styles.taskItem}
          onPress={() => toggleTask(task.id)}
        >
          <View
            style={[
              styles.checkbox,
              task.done && styles.checkboxCompleted,
            ]}
          >
            {task.done && (
              <Ionicons name="checkmark" size={16} color="#FFFFFF" />
            )}
          </View>

          <View style={styles.flex}>
            <Text
              style={[
                styles.taskTitle,
                task.done && styles.taskCompletedText,
              ]}
            >
              {task.title}
            </Text>

            <Text style={styles.taskDue}>{task.due}</Text>
          </View>

          <Ionicons
            name="ellipsis-horizontal"
            size={20}
            color={COLORS.subtext}
          />
        </Pressable>
      ))}

      <View style={{ height: 110 }} />
    </ScrollView>
  );
}

function ProfileScreen({ onLogout }: { onLogout: () => void }) {
  return (
    <ScrollView
      style={styles.page}
      contentContainerStyle={styles.pageContent}
      showsVerticalScrollIndicator={false}
    >
      <Header title="Profile" />

      <View style={styles.profileCard}>
        <View style={styles.profileAvatar}>
          <Text style={styles.profileAvatarText}>KP</Text>
        </View>

        <Text style={styles.profileName}>Kantapon</Text>
        <Text style={styles.profileEmail}>kantapon@example.com</Text>

        <View style={styles.connectedBadge}>
          <View style={styles.connectedDot} />
          <Text style={styles.connectedText}>Google connected</Text>
        </View>
      </View>

      <SectionTitle title="Connected apps" />

      <ConnectedApp
        icon="mail-outline"
        title="Gmail"
        subtitle="Connected"
      />

      <ConnectedApp
        icon="calendar-outline"
        title="Google Calendar"
        subtitle="Connected"
      />

      <ConnectedApp
        icon="folder-outline"
        title="Google Drive"
        subtitle="Connected"
      />

      <ConnectedApp
        icon="checkbox-outline"
        title="Google Tasks"
        subtitle="Connected"
      />

      <SectionTitle title="Settings" />

      <SettingItem icon="notifications-outline" title="Notifications" />
      <SettingItem icon="shield-checkmark-outline" title="Privacy & security" />
      <SettingItem icon="sparkles-outline" title="AI preferences" />

      <Pressable style={styles.logoutButton} onPress={onLogout}>
        <Ionicons name="log-out-outline" size={20} color={COLORS.red} />
        <Text style={styles.logoutText}>Sign out</Text>
      </Pressable>

      <View style={{ height: 110 }} />
    </ScrollView>
  );
}

function ConnectedApp({
  icon,
  title,
  subtitle,
}: {
  icon: any;
  title: string;
  subtitle: string;
}) {
  return (
    <View style={styles.settingRow}>
      <View style={styles.settingIcon}>
        <Ionicons name={icon} size={20} color={COLORS.primary} />
      </View>

      <View style={styles.flex}>
        <Text style={styles.settingTitle}>{title}</Text>
        <Text style={styles.settingSubtitle}>{subtitle}</Text>
      </View>

      <Ionicons name="checkmark-circle" size={21} color={COLORS.green} />
    </View>
  );
}

function SettingItem({
  icon,
  title,
}: {
  icon: any;
  title: string;
}) {
  return (
    <Pressable style={styles.settingRow}>
      <View style={styles.settingIcon}>
        <Ionicons name={icon} size={20} color={COLORS.text} />
      </View>

      <Text style={[styles.settingTitle, styles.flex]}>{title}</Text>

      <Ionicons
        name="chevron-forward"
        size={19}
        color={COLORS.subtext}
      />
    </Pressable>
  );
}

function BottomNavigation({
  tab,
  setTab,
}: {
  tab: Tab;
  setTab: (tab: Tab) => void;
}) {
  const items: {
    key: Tab;
    icon: any;
    activeIcon: any;
    label: string;
  }[] = [
    {
      key: "home",
      icon: "home-outline",
      activeIcon: "home",
      label: "Home",
    },
    {
      key: "mail",
      icon: "mail-outline",
      activeIcon: "mail",
      label: "Inbox",
    },
    {
      key: "calendar",
      icon: "calendar-outline",
      activeIcon: "calendar",
      label: "Calendar",
    },
    {
      key: "tasks",
      icon: "checkbox-outline",
      activeIcon: "checkbox",
      label: "Tasks",
    },
    {
      key: "profile",
      icon: "person-outline",
      activeIcon: "person",
      label: "Profile",
    },
  ];

  return (
    <View style={styles.bottomNav}>
      {items.map((item) => {
        const active = tab === item.key;

        return (
          <Pressable
            key={item.key}
            style={styles.navItem}
            onPress={() => setTab(item.key)}
          >
            <Ionicons
              name={active ? item.activeIcon : item.icon}
              size={22}
              color={active ? COLORS.primary : "#9CA3AF"}
            />

            <Text
              style={[
                styles.navLabel,
                active && styles.navLabelActive,
              ]}
            >
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

function MiniAvatar({ label }: { label: string }) {
  return (
    <View style={styles.miniAvatar}>
      <Text style={styles.miniAvatarText}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  screen: {
    flex: 1,
  },

  flex: {
    flex: 1,
  },

  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
  },

  boldText: {
    fontWeight: "700",
  },

  page: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  pageContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },

  /* LOGIN */

  loginContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 28,
  },

  loginTop: {
    flex: 1,
    justifyContent: "center",
  },

  loginBottom: {
    paddingBottom: 30,
  },

  logo: {
    width: 58,
    height: 58,
    borderRadius: 18,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
  },

  brand: {
    fontSize: 19,
    fontWeight: "700",
    color: COLORS.primary,
    marginBottom: 20,
  },

  loginTitle: {
    fontSize: 40,
    lineHeight: 46,
    fontWeight: "800",
    color: COLORS.text,
    letterSpacing: -1,
  },

  loginSubtitle: {
    marginTop: 18,
    fontSize: 17,
    lineHeight: 26,
    color: COLORS.subtext,
  },

  googleButton: {
    height: 58,
    borderRadius: 16,
    backgroundColor: COLORS.text,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  googleIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  googleLetter: {
    color: "#4285F4",
    fontSize: 17,
    fontWeight: "800",
  },

  googleButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },

  terms: {
    marginTop: 18,
    textAlign: "center",
    fontSize: 12,
    lineHeight: 18,
    color: "#9CA3AF",
  },

  /* HEADER */

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },

  pageTitle: {
    fontSize: 27,
    fontWeight: "800",
    color: COLORS.text,
    letterSpacing: -0.5,
  },

  pageSubtitle: {
    marginTop: 4,
    fontSize: 14,
    color: COLORS.subtext,
  },

  avatar: {
    width: 43,
    height: 43,
    borderRadius: 14,
    backgroundColor: COLORS.primarySoft,
    justifyContent: "center",
    alignItems: "center",
  },

  avatarText: {
    color: COLORS.primary,
    fontWeight: "800",
  },

  /* AI CARD */

  aiCard: {
    backgroundColor: "#15172B",
    borderRadius: 24,
    padding: 20,
    flexDirection: "row",
  },

  aiIcon: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  aiContent: {
    flex: 1,
  },

  aiLabel: {
    color: "#A5B4FC",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1,
  },

  aiTitle: {
    color: "#FFFFFF",
    marginTop: 8,
    fontSize: 20,
    lineHeight: 26,
    fontWeight: "800",
  },

  aiDescription: {
    color: "#B7BBCB",
    marginTop: 8,
    lineHeight: 20,
    fontSize: 14,
  },

  aiButton: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 6,
  },

  aiButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },

  /* SECTION */

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 26,
    marginBottom: 13,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: COLORS.text,
  },

  sectionAction: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: "700",
  },

  /* SUMMARY */

  summaryRow: {
    flexDirection: "row",
    gap: 10,
  },

  summaryCard: {
    flex: 1,
    backgroundColor: COLORS.card,
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  summaryIcon: {
    width: 36,
    height: 36,
    borderRadius: 11,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },

  summaryCount: {
    fontSize: 23,
    fontWeight: "800",
    color: COLORS.text,
  },

  summaryLabel: {
    fontSize: 12,
    color: COLORS.subtext,
    marginTop: 2,
  },

  /* MEETING */

  meetingCard: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 17,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  timeBlock: {
    width: 56,
    alignItems: "center",
    justifyContent: "center",
  },

  timeText: {
    fontSize: 17,
    fontWeight: "800",
    color: COLORS.text,
  },

  timePeriod: {
    fontSize: 11,
    color: COLORS.subtext,
    marginTop: 3,
  },

  meetingDivider: {
    width: 1,
    backgroundColor: COLORS.border,
    marginHorizontal: 16,
  },

  meetingInfo: {
    flex: 1,
  },

  meetingTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: COLORS.text,
    marginBottom: 7,
  },

  smallText: {
    fontSize: 12,
    color: COLORS.subtext,
  },

  peopleRow: {
    flexDirection: "row",
    marginTop: 13,
  },

  miniAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.primarySoft,
    alignItems: "center",
    justifyContent: "center",
    marginRight: -5,
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },

  miniAvatarText: {
    fontSize: 9,
    color: COLORS.primary,
    fontWeight: "700",
  },

  moreAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#EEF0F4",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: -5,
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },

  moreAvatarText: {
    fontSize: 9,
    fontWeight: "700",
    color: COLORS.subtext,
  },

  /* ATTENTION */

  attentionItem: {
    backgroundColor: COLORS.card,
    borderRadius: 17,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  attentionIcon: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.primarySoft,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  attentionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.text,
  },

  attentionSubtitle: {
    marginTop: 4,
    fontSize: 12,
    color: COLORS.subtext,
  },

  tag: {
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },

  tagText: {
    fontSize: 10,
    fontWeight: "700",
    color: COLORS.subtext,
  },

  /* SEARCH */

  searchBox: {
    backgroundColor: COLORS.card,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
  },

  searchInput: {
    flex: 1,
    paddingHorizontal: 10,
    color: COLORS.text,
  },

  filterRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 14,
    marginBottom: 8,
  },

  filterChip: {
    paddingVertical: 8,
    paddingHorizontal: 13,
    borderRadius: 20,
    backgroundColor: "#EAECF0",
  },

  filterChipActive: {
    backgroundColor: COLORS.text,
  },

  filterChipText: {
    color: COLORS.subtext,
    fontSize: 12,
    fontWeight: "600",
  },

  filterChipTextActive: {
    color: "#FFFFFF",
  },

  /* MAIL */

  mailList: {
    marginTop: 8,
  },

  mailItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.card,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingVertical: 16,
  },

  mailAvatar: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#EEF0F4",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  mailAvatarUnread: {
    backgroundColor: COLORS.primary,
  },

  mailAvatarText: {
    fontWeight: "800",
    color: COLORS.text,
  },

  mailBody: {
    flex: 1,
  },

  mailTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  mailSender: {
    flex: 1,
    fontSize: 14,
    color: COLORS.text,
  },

  mailTime: {
    fontSize: 11,
    color: COLORS.subtext,
  },

  mailSubject: {
    fontSize: 13,
    marginTop: 4,
    color: COLORS.text,
  },

  mailPreview: {
    fontSize: 12,
    marginTop: 4,
    color: COLORS.subtext,
  },

  unreadDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
    marginLeft: 10,
  },

  /* CALENDAR */

  weekCard: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  dayItem: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 14,
  },

  activeDay: {
    backgroundColor: COLORS.primary,
  },

  dayLabel: {
    fontSize: 9,
    fontWeight: "700",
    color: COLORS.subtext,
  },

  dayDate: {
    fontSize: 17,
    marginTop: 5,
    fontWeight: "800",
    color: COLORS.text,
  },

  activeDayText: {
    color: "#FFFFFF",
  },

  dayDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#FFFFFF",
    marginTop: 5,
  },

  calendarRow: {
    flexDirection: "row",
    marginBottom: 12,
  },

  calendarTime: {
    width: 58,
    paddingTop: 8,
  },

  calendarTimeMain: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.text,
  },

  calendarTimeEnd: {
    marginTop: 3,
    fontSize: 10,
    color: COLORS.subtext,
  },

  eventCard: {
    flex: 1,
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: 14,
    borderLeftWidth: 4,
  },

  eventTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: COLORS.text,
  },

  eventSubtitle: {
    marginTop: 5,
    fontSize: 11,
    color: COLORS.subtext,
  },

  /* TASKS */

  taskOverview: {
    padding: 20,
    backgroundColor: "#15172B",
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  taskOverviewLabel: {
    color: "#A5B4FC",
    fontSize: 10,
    letterSpacing: 1,
    fontWeight: "800",
  },

  taskOverviewTitle: {
    color: "#FFFFFF",
    fontSize: 21,
    fontWeight: "800",
    marginTop: 8,
  },

  progressCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 6,
    borderColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },

  progressText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "800",
  },

  taskItem: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 15,
    marginBottom: 9,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  checkbox: {
    width: 23,
    height: 23,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: "#D1D5DB",
    marginRight: 13,
    justifyContent: "center",
    alignItems: "center",
  },

  checkboxCompleted: {
    backgroundColor: COLORS.green,
    borderColor: COLORS.green,
  },

  taskTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.text,
  },

  taskCompletedText: {
    color: "#9CA3AF",
    textDecorationLine: "line-through",
  },

  taskDue: {
    fontSize: 11,
    color: COLORS.subtext,
    marginTop: 4,
  },

  /* PROFILE */

  profileCard: {
    backgroundColor: COLORS.card,
    borderRadius: 22,
    alignItems: "center",
    padding: 25,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  profileAvatar: {
    width: 72,
    height: 72,
    borderRadius: 24,
    backgroundColor: COLORS.primarySoft,
    justifyContent: "center",
    alignItems: "center",
  },

  profileAvatarText: {
    fontSize: 22,
    fontWeight: "800",
    color: COLORS.primary,
  },

  profileName: {
    marginTop: 13,
    fontSize: 20,
    fontWeight: "800",
    color: COLORS.text,
  },

  profileEmail: {
    fontSize: 13,
    color: COLORS.subtext,
    marginTop: 4,
  },

  connectedBadge: {
    marginTop: 13,
    backgroundColor: COLORS.greenSoft,
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
  },

  connectedDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: COLORS.green,
    marginRight: 6,
  },

  connectedText: {
    color: COLORS.green,
    fontSize: 11,
    fontWeight: "700",
  },

  settingRow: {
    backgroundColor: COLORS.card,
    borderRadius: 15,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  settingIcon: {
    width: 38,
    height: 38,
    borderRadius: 11,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  settingTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.text,
  },

  settingSubtitle: {
    fontSize: 11,
    color: COLORS.green,
    marginTop: 3,
  },

  logoutButton: {
    marginTop: 25,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: "#FCA5A5",
    borderRadius: 14,
    paddingVertical: 14,
  },

  logoutText: {
    color: COLORS.red,
    fontWeight: "700",
  },

  /* NAV */

  bottomNav: {
    position: "absolute",
    left: 14,
    right: 14,
    bottom: 12,
    height: 72,
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 8,
  },

  navItem: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  navLabel: {
    marginTop: 4,
    fontSize: 9,
    color: "#9CA3AF",
    fontWeight: "600",
  },

  navLabelActive: {
    color: COLORS.primary,
    fontWeight: "800",
  },
});