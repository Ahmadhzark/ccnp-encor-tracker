// Canonical CCNP ENCOR 350-401 curriculum — the single source of truth for the
// app. Weeks are DERIVED from START, so the schedule can never drift from the
// dates it claims. User progress is stored separately and keyed by these ids.

import type { Domain, Lab, Topic, Week } from "./types";

// ── Study plan configuration ────────────────────────────────────────────────
// Set these to your own study window. START is the first day of week 1; the
// full 24-week schedule and every week's dates are calculated from it, so this
// is the only place you change to shift the whole plan. Dates are ISO
// (YYYY-MM-DD). TOTAL_HOURS / TOTAL_LABS are the program targets.
export const START = "2026-07-16";
export const EXAM = "2026-12-31";
export const TOTAL_LABS = 300;
export const TOTAL_HOURS = 360;

export const DOMAINS: Domain[] = [
  { id: "1.0", name: "Architecture", weight: 15, order: 1 },
  { id: "2.0", name: "Virtualization", weight: 10, order: 2 },
  { id: "3.0", name: "Infrastructure", weight: 30, order: 3 },
  { id: "4.0", name: "Network Assurance", weight: 10, order: 4 },
  { id: "5.0", name: "Security", weight: 20, order: 5 },
  { id: "6.0", name: "Automation", weight: 15, order: 6 },
];

const WEEK_FOCUS = [
  "Switching Fundamentals", "Spanning Tree", "IP Routing Basics", "EIGRP",
  "OSPF Core", "OSPF Advanced", "BGP", "First Hop Redundancy & Multicast",
  "Wireless Fundamentals", "Wireless Deployment", "Enterprise Design",
  "SD-WAN / SD-Access", "Device Security", "ACLs & Infrastructure Security",
  "AAA & Identity", "Wireless & Network Security", "Virtualization",
  "Tunneling & Overlay", "QoS & Diagnostics", "Monitoring", "Assurance Platforms",
  "Automation", "Automation Tools + Review", "Mock Exams & Weak Areas",
];

// `blurb` is the exam angle: the thing most likely tested, or the classic trap.
const RAW_TOPICS: Omit<Topic, "domainId">[] = [
  { id: "3.1", name: "VLANs & Trunking", hours: 7, week: 1, blurb: "Native VLAN mismatch is a classic trap. Tagged versus untagged decides everything." },
  { id: "3.2", name: "EtherChannel (LACP/PAgP)", hours: 7, week: 1, blurb: "A channel forms only when mode, speed, duplex and allowed VLANs all agree on both ends." },
  { id: "3.3", name: "STP & RSTP", hours: 7, week: 2, blurb: "Lowest bridge ID wins root. Every tie-break after that is where the exam points live." },
  { id: "3.4", name: "MST & STP Protection", hours: 7, week: 2, blurb: "Region name, revision number and VLAN-to-instance map must match exactly, or MST splits." },
  { id: "3.5", name: "Routing Concepts & Lookup Process", hours: 7, week: 3, blurb: "Longest prefix wins first — before administrative distance, before metric. Order matters." },
  { id: "3.6", name: "Static Routing & Admin Distance", hours: 7, week: 3, blurb: "AD picks the source, metric picks the path. Floating statics exploit exactly that." },
  { id: "3.7", name: "EIGRP Neighbors & Metrics", hours: 7, week: 4, blurb: "K-values, AS number and primary subnet must match or the adjacency never forms." },
  { id: "3.8", name: "EIGRP Advanced (stub, summary, DUAL)", hours: 8, week: 4, blurb: "Feasibility condition: reported distance must be less than feasible distance. That one rule drives DUAL." },
  { id: "3.9", name: "OSPFv2 Neighbors & LSA Types", hours: 8, week: 5, blurb: "LSA types 1, 2, 3, 4, 5 and 7 tell you exactly where you are in the topology." },
  { id: "3.10", name: "OSPF Areas & Area Types", hours: 7, week: 5, blurb: "Stub, totally stubby and NSSA each block a different LSA type. Know which." },
  { id: "3.11", name: "OSPF Optimization & Summarization", hours: 7, week: 6, blurb: "Summarize only at ABRs and ASBRs. Anywhere else, it is not summarization." },
  { id: "3.12", name: "OSPFv3", hours: 7, week: 6, blurb: "Runs over link-local, is per-link not per-subnet, and needs no network statement." },
  { id: "3.13", name: "eBGP & iBGP Peering", hours: 8, week: 7, blurb: "iBGP will not readvertise iBGP-learned routes — hence route reflectors or a full mesh." },
  { id: "3.14", name: "BGP Path Selection & Attributes", hours: 8, week: 7, blurb: "Weight, Local Preference, Locally Originated, AS-Path, Origin, MED. Learn the order cold." },
  { id: "3.15", name: "HSRP / VRRP", hours: 7, week: 8, blurb: "HSRP preemption is off by default, VRRP is on. That default has failed many labs." },
  { id: "3.16", name: "Multicast (PIM, IGMP, RP)", hours: 7, week: 8, blurb: "The RPF check drops anything arriving on the wrong interface. Start troubleshooting there." },
  { id: "1.1", name: "RF Fundamentals", hours: 7, week: 9, blurb: "dBm, mW, and the rule of 3s and 10s. Fast mental math wins these questions." },
  { id: "1.2", name: "AP Modes & Antenna Types", hours: 7, week: 9, blurb: "Local, FlexConnect, monitor, sniffer — each changes where traffic is actually switched." },
  { id: "1.3", name: "WLC Architecture & AP Discovery", hours: 7, week: 10, blurb: "CAPWAP discovery order: broadcast, DHCP option 43, DNS, then previously known controllers." },
  { id: "1.4", name: "Client Roaming", hours: 7, week: 10, blurb: "Intra-controller versus inter-controller decides whether the client keeps its IP." },
  { id: "1.5", name: "Campus Design (2/3-tier, fabric)", hours: 7, week: 11, blurb: "Two-tier collapses core into distribution. Know when that is the right call." },
  { id: "1.6", name: "High Availability Techniques", hours: 7, week: 11, blurb: "SSO, NSF and graceful restart keep the data plane forwarding while the control plane reloads." },
  { id: "1.7", name: "SD-WAN Architecture", hours: 8, week: 12, blurb: "vBond authenticates, vSmart distributes policy, vManage manages, vEdge forwards." },
  { id: "1.8", name: "SD-Access Architecture", hours: 8, week: 12, blurb: "LISP is the control plane, VXLAN the data plane, TrustSec the policy. Three planes, three protocols." },
  { id: "5.1", name: "Device Access Control (lines, passwords, SSH)", hours: 7, week: 13, blurb: "SSH version 2, transport input, exec-timeout. Small commands, easy marks." },
  { id: "5.2", name: "CoPP", hours: 6, week: 13, blurb: "Protects the control plane from traffic that would otherwise punt to the CPU." },
  { id: "5.3", name: "ACLs (standard, extended, IPv6, VACL)", hours: 7, week: 14, blurb: "Implicit deny any at the end. The order of entries is the entire game." },
  { id: "5.4", name: "Layer 2 Security (DAI, DHCP snooping, port-sec)", hours: 7, week: 14, blurb: "DHCP snooping builds the binding table that DAI trusts. Order of operations matters." },
  { id: "5.5", name: "AAA (TACACS+, RADIUS)", hours: 7, week: 15, blurb: "TACACS+ separates AAA and encrypts the whole payload. RADIUS encrypts only the password." },
  { id: "5.6", name: "802.1X / MAB / WebAuth", hours: 7, week: 15, blurb: "Supplicant, authenticator, authentication server. MAB catches what cannot speak dot1x." },
  { id: "5.7", name: "Wireless Security (WPA2/3, EAP, PSK)", hours: 7, week: 16, blurb: "WPA3 replaces the PSK handshake with SAE, killing offline dictionary attacks." },
  { id: "5.8", name: "Security Components (ISE, Umbrella, Stealthwatch)", hours: 6, week: 16, blurb: "ISE for identity, Umbrella for DNS-layer, Stealthwatch for flow anomalies." },
  { id: "2.1", name: "Hypervisors & Virtual Machines", hours: 7, week: 17, blurb: "Type 1 runs on bare metal, type 2 runs on a host OS. Know the trade-offs." },
  { id: "2.2", name: "VRF & VRF-Lite", hours: 8, week: 17, blurb: "Separate routing tables on a single box — and VRF-Lite needs no MPLS at all." },
  { id: "2.3", name: "GRE & IPsec Tunneling", hours: 8, week: 18, blurb: "GRE carries anything but encrypts nothing. IPsec encrypts but will not carry multicast alone." },
  { id: "2.4", name: "LISP", hours: 7, week: 18, blurb: "Separates identity (EID) from location (RLOC). You map, you do not route." },
  { id: "2.5", name: "VXLAN", hours: 7, week: 18, blurb: "MAC-in-UDP with a 24-bit VNI — 16 million segments instead of 4094 VLANs." },
  { id: "4.1", name: "QoS (classification, marking, queuing)", hours: 8, week: 19, blurb: "Classify and mark at the edge, queue in the core. Trust boundaries decide everything." },
  { id: "4.2", name: "Diagnostic Tools (ping, traceroute, debug)", hours: 6, week: 19, blurb: "Conditional debugs save the CPU — and your lab. Never debug all on a live box." },
  { id: "4.3", name: "NetFlow & SPAN/RSPAN/ERSPAN", hours: 7, week: 20, blurb: "NetFlow summarizes flows, SPAN copies packets. Different questions, different tools." },
  { id: "4.4", name: "SNMP & Syslog", hours: 6, week: 20, blurb: "SNMPv3 adds authentication and encryption. Syslog severity 0 to 7 — lower is worse." },
  { id: "4.5", name: "IP SLA", hours: 6, week: 21, blurb: "Probe, track, then act. IP SLA plus object tracking drives dynamic failover." },
  { id: "4.6", name: "DNA Center Assurance & NETCONF/RESTCONF", hours: 7, week: 21, blurb: "NETCONF uses YANG over SSH. RESTCONF is the HTTP-based cousin." },
  { id: "6.1", name: "Python Basics & Data Formats (JSON/XML/YAML)", hours: 7, week: 22, blurb: "JSON, XML and YAML. Know how each nests and where the brackets and indents go." },
  { id: "6.2", name: "EEM Applets", hours: 6, week: 22, blurb: "Event triggers, action runs. Automate the box from inside the box." },
  { id: "6.3", name: "REST APIs & Webhooks", hours: 7, week: 22, blurb: "Verbs, status codes and auth headers. The difference between 401 and 403 is a real question." },
  { id: "6.4", name: "Ansible / Puppet / Chef Concepts", hours: 7, week: 23, blurb: "Ansible is agentless and push. Puppet and Chef are agent-based and pull." },
  { id: "6.5", name: "Controller APIs (DNAC, vManage)", hours: 7, week: 23, blurb: "Token first, then call. Both DNAC and vManage gate everything on an auth token." },
];

export const LABS: Lab[] = [
  { id: "L001", name: "Create VLANs and assign access ports", difficulty: "E", minutes: 30, tech: "VLAN, access ports", week: 1, topic: "3.1" },
  { id: "L002", name: "Configure 802.1Q trunk between two switches", difficulty: "E", minutes: 30, tech: "802.1Q, trunking", week: 1, topic: "3.1" },
  { id: "L003", name: "Manipulate native VLAN and prove tagging behaviour", difficulty: "M", minutes: 45, tech: "Native VLAN, DTP", week: 1, topic: "3.1" },
  { id: "L004", name: "Prune VLANs from a trunk with allowed-vlan lists", difficulty: "M", minutes: 30, tech: "VLAN pruning", week: 1, topic: "3.1" },
  { id: "L005", name: "Configure and verify VTPv3", difficulty: "M", minutes: 45, tech: "VTPv3", week: 1, topic: "3.1" },
  { id: "L006", name: "Break/fix: VLAN mismatch across trunk", difficulty: "H", minutes: 45, tech: "Trunking, troubleshooting", week: 1, topic: "3.1" },
  { id: "L007", name: "Build static (mode on) EtherChannel", difficulty: "E", minutes: 30, tech: "EtherChannel", week: 1, topic: "3.2" },
  { id: "L008", name: "Build LACP EtherChannel with active/passive", difficulty: "E", minutes: 30, tech: "LACP", week: 1, topic: "3.2" },
  { id: "L009", name: "Build PAgP EtherChannel with desirable/auto", difficulty: "E", minutes: 30, tech: "PAgP", week: 1, topic: "3.2" },
  { id: "L010", name: "Configure Layer 3 EtherChannel", difficulty: "M", minutes: 45, tech: "L3 port-channel", week: 1, topic: "3.2" },
  { id: "L011", name: "Tune load-balancing hash and verify distribution", difficulty: "M", minutes: 45, tech: "Load balancing", week: 1, topic: "3.2" },
  { id: "L012", name: "Break/fix: EtherChannel misconfig (mode/speed/duplex)", difficulty: "H", minutes: 45, tech: "Troubleshooting", week: 1, topic: "3.2" },
  { id: "L013", name: "Observe root bridge election and port roles", difficulty: "E", minutes: 30, tech: "802.1D, PVST+", week: 2, topic: "3.3" },
  { id: "L014", name: "Force root bridge with priority and diameter tuning", difficulty: "M", minutes: 45, tech: "Root priority", week: 2, topic: "3.3" },
  { id: "L015", name: "Influence path with cost and port-priority", difficulty: "M", minutes: 45, tech: "STP cost", week: 2, topic: "3.3" },
  { id: "L016", name: "Configure RSTP and measure convergence", difficulty: "M", minutes: 45, tech: "802.1w", week: 2, topic: "3.3" },
  { id: "L017", name: "Configure PortFast and edge ports", difficulty: "E", minutes: 30, tech: "PortFast", week: 2, topic: "3.3" },
  { id: "L018", name: "Break/fix: unexpected root bridge", difficulty: "H", minutes: 45, tech: "Troubleshooting", week: 2, topic: "3.3" },
  { id: "L019", name: "Configure MST region with two instances", difficulty: "M", minutes: 45, tech: "802.1s", week: 2, topic: "3.4" },
  { id: "L020", name: "Map VLANs to MST instances and load-share", difficulty: "H", minutes: 60, tech: "MST mapping", week: 2, topic: "3.4" },
  { id: "L021", name: "Configure BPDU Guard and BPDU Filter", difficulty: "M", minutes: 30, tech: "BPDU Guard", week: 2, topic: "3.4" },
  { id: "L022", name: "Configure Root Guard", difficulty: "M", minutes: 30, tech: "Root Guard", week: 2, topic: "3.4" },
  { id: "L023", name: "Configure Loop Guard and UDLD", difficulty: "M", minutes: 45, tech: "Loop Guard, UDLD", week: 2, topic: "3.4" },
  { id: "L024", name: "Break/fix: MST region mismatch", difficulty: "H", minutes: 60, tech: "Troubleshooting", week: 2, topic: "3.4" },
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function shiftDate(iso: string, days: number): string {
  const d = new Date(Date.parse(iso + "T00:00:00Z") + days * 86400000);
  return d.toISOString().slice(0, 10);
}

function pretty(iso: string): string {
  const d = new Date(Date.parse(iso + "T00:00:00Z"));
  return `${MONTHS[d.getUTCMonth()]} ${String(d.getUTCDate()).padStart(2, "0")}`;
}

export function domainOf(topicId: string): string {
  return topicId.split(".")[0] + ".0";
}

export const TOPICS: Topic[] = RAW_TOPICS.map((t) => ({ ...t, domainId: domainOf(t.id) }));

// Build the 24-week schedule for any start/exam window. Week 1 begins on `start`,
// each following week is +7 days, and the final week ends on `exam`. Used both
// for the default WEEKS below and for user-configured plans (see lib/plan.ts).
export function buildWeeks(start: string, exam: string): Week[] {
  return WEEK_FOCUS.map((focus, i) => {
    const id = i + 1;
    const starts = shiftDate(start, i * 7);
    const ends = id === WEEK_FOCUS.length ? exam : shiftDate(starts, 6);
    return { id, focus, starts, ends, label: `${pretty(starts)} – ${pretty(ends)}` };
  });
}

export const WEEKS: Week[] = buildWeeks(START, EXAM);

/** Number of weeks in the program — the schedule is always this many weeks long. */
export const PROGRAM_WEEKS = WEEK_FOCUS.length;

/** Long-form date, e.g. "Dec 31, 2026". */
export function prettyLong(iso: string): string {
  const d = new Date(Date.parse(iso + "T00:00:00Z"));
  return `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
}

export const TOTAL_TOPICS = TOPICS.length;
