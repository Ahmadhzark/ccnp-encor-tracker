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
export const TOTAL_LABS = 150;
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

  // ── Domain 3: Routing (weeks 3–8) ──────────────────────────────────────────
  { id: "L025", name: "Read the routing table and prove longest-prefix match", difficulty: "E", minutes: 30, tech: "Lookup process", week: 3, topic: "3.5" },
  { id: "L026", name: "Compare administrative distance across route sources", difficulty: "M", minutes: 45, tech: "Administrative distance", week: 3, topic: "3.5" },
  { id: "L027", name: "Predict the chosen path with overlapping routes", difficulty: "M", minutes: 45, tech: "Route selection", week: 3, topic: "3.5" },
  { id: "L028", name: "Configure IPv4 and IPv6 static routes", difficulty: "E", minutes: 30, tech: "Static routing", week: 3, topic: "3.6" },
  { id: "L029", name: "Configure a floating static backup route", difficulty: "M", minutes: 45, tech: "Floating static", week: 3, topic: "3.6" },
  { id: "L030", name: "Break/fix: recursive static route fails to resolve", difficulty: "H", minutes: 60, tech: "Troubleshooting", week: 3, topic: "3.6" },
  { id: "L031", name: "Enable EIGRP named mode and form neighbors", difficulty: "E", minutes: 30, tech: "EIGRP named mode", week: 4, topic: "3.7" },
  { id: "L032", name: "Tune K-values and verify metric calculation", difficulty: "M", minutes: 45, tech: "EIGRP metrics", week: 4, topic: "3.7" },
  { id: "L033", name: "Break/fix: EIGRP adjacency will not form", difficulty: "H", minutes: 60, tech: "Troubleshooting", week: 4, topic: "3.7" },
  { id: "L034", name: "Configure EIGRP stub routing", difficulty: "M", minutes: 45, tech: "EIGRP stub", week: 4, topic: "3.8" },
  { id: "L035", name: "Summarize EIGRP routes and observe query scope", difficulty: "M", minutes: 45, tech: "EIGRP summarization", week: 4, topic: "3.8" },
  { id: "L036", name: "Analyze DUAL: successor and feasible successor", difficulty: "H", minutes: 60, tech: "DUAL", week: 4, topic: "3.8" },
  { id: "L037", name: "Enable OSPFv2 and establish adjacency", difficulty: "E", minutes: 30, tech: "OSPFv2", week: 5, topic: "3.9" },
  { id: "L038", name: "Identify LSA types with show commands", difficulty: "M", minutes: 45, tech: "OSPF LSAs", week: 5, topic: "3.9" },
  { id: "L039", name: "Break/fix: OSPF neighbor stuck in EXSTART (MTU)", difficulty: "H", minutes: 60, tech: "Troubleshooting", week: 5, topic: "3.9" },
  { id: "L040", name: "Configure a stub and totally-stubby area", difficulty: "M", minutes: 45, tech: "OSPF stub areas", week: 5, topic: "3.10" },
  { id: "L041", name: "Configure an NSSA and translate type-7 LSAs", difficulty: "M", minutes: 45, tech: "OSPF NSSA", week: 5, topic: "3.10" },
  { id: "L042", name: "Fix a discontiguous area with a virtual link", difficulty: "H", minutes: 60, tech: "Virtual link", week: 5, topic: "3.10" },
  { id: "L043", name: "Summarize inter-area routes at an ABR", difficulty: "M", minutes: 45, tech: "OSPF summarization", week: 6, topic: "3.11" },
  { id: "L044", name: "Tune OSPF cost and reference bandwidth", difficulty: "M", minutes: 45, tech: "OSPF cost", week: 6, topic: "3.11" },
  { id: "L045", name: "Configure OSPF SHA authentication", difficulty: "M", minutes: 45, tech: "OSPF authentication", week: 6, topic: "3.11" },
  { id: "L046", name: "Enable OSPFv3 for IPv6", difficulty: "E", minutes: 30, tech: "OSPFv3", week: 6, topic: "3.12" },
  { id: "L047", name: "Run OSPFv3 with IPv4 and IPv6 address families", difficulty: "M", minutes: 45, tech: "OSPFv3 AF", week: 6, topic: "3.12" },
  { id: "L048", name: "Break/fix: OSPFv3 adjacency over link-local", difficulty: "H", minutes: 60, tech: "Troubleshooting", week: 6, topic: "3.12" },
  { id: "L049", name: "Configure eBGP peering and advertise networks", difficulty: "E", minutes: 30, tech: "eBGP", week: 7, topic: "3.13" },
  { id: "L050", name: "Configure iBGP with a route reflector", difficulty: "M", minutes: 45, tech: "Route reflector", week: 7, topic: "3.13" },
  { id: "L051", name: "Break/fix: iBGP routes not installed (next-hop-self)", difficulty: "H", minutes: 60, tech: "Troubleshooting", week: 7, topic: "3.13" },
  { id: "L052", name: "Influence path with weight and local-preference", difficulty: "M", minutes: 45, tech: "Weight, Local-Pref", week: 7, topic: "3.14" },
  { id: "L053", name: "Prepend AS-path and set MED", difficulty: "M", minutes: 45, tech: "AS-path, MED", week: 7, topic: "3.14" },
  { id: "L054", name: "Filter prefixes with prefix-lists and route-maps", difficulty: "H", minutes: 60, tech: "BGP filtering", week: 7, topic: "3.14" },
  { id: "L055", name: "Configure HSRPv2 with preempt and tracking", difficulty: "E", minutes: 30, tech: "HSRP", week: 8, topic: "3.15" },
  { id: "L056", name: "Configure VRRP and compare its defaults", difficulty: "M", minutes: 45, tech: "VRRP", week: 8, topic: "3.15" },
  { id: "L057", name: "Break/fix: HSRP active/active split", difficulty: "H", minutes: 60, tech: "Troubleshooting", week: 8, topic: "3.15" },
  { id: "L058", name: "Configure PIM sparse-mode with a static RP", difficulty: "M", minutes: 45, tech: "PIM-SM", week: 8, topic: "3.16" },
  { id: "L059", name: "Configure IGMP snooping and verify joins", difficulty: "M", minutes: 45, tech: "IGMP", week: 8, topic: "3.16" },
  { id: "L060", name: "Troubleshoot a multicast RPF failure", difficulty: "H", minutes: 60, tech: "RPF", week: 8, topic: "3.16" },

  // ── Domain 1: Architecture & Wireless (weeks 9–12) ─────────────────────────
  { id: "L061", name: "Calculate EIRP with the 3s-and-10s rule", difficulty: "E", minutes: 30, tech: "RF math", week: 9, topic: "1.1" },
  { id: "L062", name: "Interpret an RF spectrum capture", difficulty: "M", minutes: 45, tech: "Spectrum analysis", week: 9, topic: "1.1" },
  { id: "L063", name: "Plan non-overlapping 2.4 and 5 GHz channels", difficulty: "M", minutes: 45, tech: "Channel planning", week: 9, topic: "1.1" },
  { id: "L064", name: "Convert an AP between local and FlexConnect", difficulty: "E", minutes: 30, tech: "AP modes", week: 9, topic: "1.2" },
  { id: "L065", name: "Configure a monitor / sniffer-mode AP", difficulty: "M", minutes: 45, tech: "Sniffer mode", week: 9, topic: "1.2" },
  { id: "L066", name: "Compare antenna types and coverage patterns", difficulty: "M", minutes: 45, tech: "Antennas", week: 9, topic: "1.2" },
  { id: "L067", name: "Join an AP to a WLC over CAPWAP", difficulty: "E", minutes: 30, tech: "CAPWAP", week: 10, topic: "1.3" },
  { id: "L068", name: "Configure DHCP option 43 for AP discovery", difficulty: "M", minutes: 45, tech: "Option 43", week: 10, topic: "1.3" },
  { id: "L069", name: "Break/fix: AP fails to join the controller", difficulty: "H", minutes: 60, tech: "Troubleshooting", week: 10, topic: "1.3" },
  { id: "L070", name: "Configure intra-controller roaming", difficulty: "M", minutes: 45, tech: "Intra-WLC roam", week: 10, topic: "1.4" },
  { id: "L071", name: "Configure mobility groups for inter-controller roam", difficulty: "M", minutes: 45, tech: "Mobility groups", week: 10, topic: "1.4" },
  { id: "L072", name: "Troubleshoot a client that drops on roam", difficulty: "H", minutes: 60, tech: "Troubleshooting", week: 10, topic: "1.4" },
  { id: "L073", name: "Build a collapsed-core two-tier design", difficulty: "M", minutes: 45, tech: "Two-tier design", week: 11, topic: "1.5" },
  { id: "L074", name: "Build a three-tier hierarchy with L3 access", difficulty: "M", minutes: 45, tech: "Three-tier design", week: 11, topic: "1.5" },
  { id: "L075", name: "Map an underlay/overlay fabric design", difficulty: "M", minutes: 45, tech: "Fabric design", week: 11, topic: "1.5" },
  { id: "L076", name: "Configure StackWise and verify SSO", difficulty: "M", minutes: 45, tech: "StackWise, SSO", week: 11, topic: "1.6" },
  { id: "L077", name: "Configure NSF / graceful restart", difficulty: "M", minutes: 45, tech: "NSF", week: 11, topic: "1.6" },
  { id: "L078", name: "Test failover and measure convergence", difficulty: "H", minutes: 60, tech: "HA failover", week: 11, topic: "1.6" },
  { id: "L079", name: "Map the SD-WAN components and their roles", difficulty: "E", minutes: 30, tech: "SD-WAN components", week: 12, topic: "1.7" },
  { id: "L080", name: "Bring up a WAN Edge control connection", difficulty: "M", minutes: 45, tech: "Control connections", week: 12, topic: "1.7" },
  { id: "L081", name: "Apply a centralized SD-WAN data policy", difficulty: "H", minutes: 60, tech: "SD-WAN policy", week: 12, topic: "1.7" },
  { id: "L082", name: "Map the SD-Access planes (LISP/VXLAN/TrustSec)", difficulty: "E", minutes: 30, tech: "SD-Access planes", week: 12, topic: "1.8" },
  { id: "L083", name: "Provision a fabric edge in DNA Center", difficulty: "M", minutes: 45, tech: "Fabric provisioning", week: 12, topic: "1.8" },
  { id: "L084", name: "Troubleshoot host onboarding in the fabric", difficulty: "H", minutes: 60, tech: "Troubleshooting", week: 12, topic: "1.8" },

  // ── Domain 5: Security (weeks 13–16) ───────────────────────────────────────
  { id: "L085", name: "Secure console and VTY lines", difficulty: "E", minutes: 30, tech: "Line security", week: 13, topic: "5.1" },
  { id: "L086", name: "Configure SSHv2 with RSA keys", difficulty: "E", minutes: 30, tech: "SSHv2", week: 13, topic: "5.1" },
  { id: "L087", name: "Configure role-based CLI views", difficulty: "M", minutes: 45, tech: "RBAC views", week: 13, topic: "5.1" },
  { id: "L088", name: "Build a CoPP policy for control-plane traffic", difficulty: "M", minutes: 45, tech: "CoPP", week: 13, topic: "5.2" },
  { id: "L089", name: "Tune CoPP to stop a control-plane flood", difficulty: "H", minutes: 60, tech: "CoPP tuning", week: 13, topic: "5.2" },
  { id: "L090", name: "Write a standard numbered ACL", difficulty: "E", minutes: 30, tech: "Standard ACL", week: 14, topic: "5.3" },
  { id: "L091", name: "Write an extended ACL with logging", difficulty: "M", minutes: 45, tech: "Extended ACL", week: 14, topic: "5.3" },
  { id: "L092", name: "Configure IPv6 ACLs and a VACL", difficulty: "M", minutes: 45, tech: "IPv6 ACL, VACL", week: 14, topic: "5.3" },
  { id: "L093", name: "Configure port-security with sticky MAC", difficulty: "E", minutes: 30, tech: "Port-security", week: 14, topic: "5.4" },
  { id: "L094", name: "Enable DHCP snooping and trust uplinks", difficulty: "M", minutes: 45, tech: "DHCP snooping", week: 14, topic: "5.4" },
  { id: "L095", name: "Enable Dynamic ARP Inspection and test", difficulty: "H", minutes: 60, tech: "DAI", week: 14, topic: "5.4" },
  { id: "L096", name: "Configure TACACS+ for device administration", difficulty: "M", minutes: 45, tech: "TACACS+", week: 15, topic: "5.5" },
  { id: "L097", name: "Configure RADIUS with local fallback", difficulty: "M", minutes: 45, tech: "RADIUS", week: 15, topic: "5.5" },
  { id: "L098", name: "Break/fix: locked out by an AAA method list", difficulty: "H", minutes: 60, tech: "Troubleshooting", week: 15, topic: "5.5" },
  { id: "L099", name: "Configure 802.1X on an access port", difficulty: "M", minutes: 45, tech: "802.1X", week: 15, topic: "5.6" },
  { id: "L100", name: "Configure MAB fallback", difficulty: "M", minutes: 45, tech: "MAB", week: 15, topic: "5.6" },
  { id: "L101", name: "Configure WebAuth for guest access", difficulty: "M", minutes: 45, tech: "WebAuth", week: 15, topic: "5.6" },
  { id: "L102", name: "Configure a WPA2-PSK WLAN", difficulty: "E", minutes: 30, tech: "WPA2-PSK", week: 16, topic: "5.7" },
  { id: "L103", name: "Configure a WPA2-Enterprise (802.1X) WLAN", difficulty: "M", minutes: 45, tech: "WPA2-Enterprise", week: 16, topic: "5.7" },
  { id: "L104", name: "Enable WPA3-SAE and verify the handshake", difficulty: "M", minutes: 45, tech: "WPA3-SAE", week: 16, topic: "5.7" },
  { id: "L105", name: "Map ISE, Umbrella and Stealthwatch roles", difficulty: "M", minutes: 45, tech: "Security portfolio", week: 16, topic: "5.8" },
  { id: "L106", name: "Integrate a switch with ISE for profiling", difficulty: "M", minutes: 45, tech: "ISE profiling", week: 16, topic: "5.8" },

  // ── Domain 2: Virtualization (weeks 17–18) ─────────────────────────────────
  { id: "L107", name: "Compare type-1 and type-2 hypervisors", difficulty: "E", minutes: 30, tech: "Hypervisors", week: 17, topic: "2.1" },
  { id: "L108", name: "Map a virtual switch to physical uplinks", difficulty: "M", minutes: 45, tech: "Virtual switching", week: 17, topic: "2.1" },
  { id: "L109", name: "Configure VRF-Lite for two customers", difficulty: "M", minutes: 45, tech: "VRF-Lite", week: 17, topic: "2.2" },
  { id: "L110", name: "Leak routes between VRFs with route-targets", difficulty: "M", minutes: 45, tech: "Route leaking", week: 17, topic: "2.2" },
  { id: "L111", name: "Break/fix: traffic landing in the wrong VRF", difficulty: "H", minutes: 60, tech: "Troubleshooting", week: 17, topic: "2.2" },
  { id: "L112", name: "Build a GRE tunnel between routers", difficulty: "E", minutes: 30, tech: "GRE", week: 18, topic: "2.3" },
  { id: "L113", name: "Protect the tunnel with IPsec (IKEv2)", difficulty: "M", minutes: 45, tech: "IPsec", week: 18, topic: "2.3" },
  { id: "L114", name: "Break/fix: tunnel up but no traffic (MTU/ACL)", difficulty: "H", minutes: 60, tech: "Troubleshooting", week: 18, topic: "2.3" },
  { id: "L115", name: "Configure a LISP xTR mapping", difficulty: "M", minutes: 45, tech: "LISP xTR", week: 18, topic: "2.4" },
  { id: "L116", name: "Verify EID-to-RLOC mapping", difficulty: "M", minutes: 45, tech: "LISP mapping", week: 18, topic: "2.4" },
  { id: "L117", name: "Configure a VXLAN Layer 2 segment", difficulty: "M", minutes: 45, tech: "VXLAN", week: 18, topic: "2.5" },
  { id: "L118", name: "Verify VNI-to-VLAN mapping", difficulty: "M", minutes: 45, tech: "VNI mapping", week: 18, topic: "2.5" },

  // ── Domain 4: Network Assurance (weeks 19–21) ──────────────────────────────
  { id: "L119", name: "Classify and mark traffic with MQC", difficulty: "M", minutes: 45, tech: "MQC marking", week: 19, topic: "4.1" },
  { id: "L120", name: "Configure LLQ for voice", difficulty: "M", minutes: 45, tech: "LLQ", week: 19, topic: "4.1" },
  { id: "L121", name: "Configure WRED and traffic shaping", difficulty: "M", minutes: 45, tech: "WRED, shaping", week: 19, topic: "4.1" },
  { id: "L122", name: "Isolate a fault with ping and traceroute", difficulty: "E", minutes: 30, tech: "ping, traceroute", week: 19, topic: "4.2" },
  { id: "L123", name: "Run a conditional debug safely", difficulty: "M", minutes: 45, tech: "Conditional debug", week: 19, topic: "4.2" },
  { id: "L124", name: "Configure Flexible NetFlow", difficulty: "M", minutes: 45, tech: "Flexible NetFlow", week: 20, topic: "4.3" },
  { id: "L125", name: "Configure local SPAN", difficulty: "M", minutes: 45, tech: "SPAN", week: 20, topic: "4.3" },
  { id: "L126", name: "Configure ERSPAN to a remote analyzer", difficulty: "M", minutes: 45, tech: "ERSPAN", week: 20, topic: "4.3" },
  { id: "L127", name: "Configure SNMPv2c read-only access", difficulty: "E", minutes: 30, tech: "SNMPv2c", week: 20, topic: "4.4" },
  { id: "L128", name: "Configure SNMPv3 with auth and privacy", difficulty: "M", minutes: 45, tech: "SNMPv3", week: 20, topic: "4.4" },
  { id: "L129", name: "Send syslog to a server with severity filtering", difficulty: "M", minutes: 45, tech: "Syslog", week: 20, topic: "4.4" },
  { id: "L130", name: "Configure an ICMP-echo IP SLA", difficulty: "M", minutes: 45, tech: "IP SLA", week: 21, topic: "4.5" },
  { id: "L131", name: "Track an SLA to drive a floating static", difficulty: "M", minutes: 45, tech: "Object tracking", week: 21, topic: "4.5" },
  { id: "L132", name: "Break/fix: SLA not triggering failover", difficulty: "H", minutes: 60, tech: "Troubleshooting", week: 21, topic: "4.5" },
  { id: "L133", name: "Explore DNA Center Assurance health scores", difficulty: "M", minutes: 45, tech: "DNAC Assurance", week: 21, topic: "4.6" },
  { id: "L134", name: "Make a NETCONF get-config call", difficulty: "M", minutes: 45, tech: "NETCONF", week: 21, topic: "4.6" },
  { id: "L135", name: "Make a RESTCONF GET with curl", difficulty: "M", minutes: 45, tech: "RESTCONF", week: 21, topic: "4.6" },

  // ── Domain 6: Automation (weeks 22–23) ─────────────────────────────────────
  { id: "L136", name: "Parse JSON into Python objects", difficulty: "E", minutes: 30, tech: "Python, JSON", week: 22, topic: "6.1" },
  { id: "L137", name: "Convert between JSON, XML and YAML", difficulty: "M", minutes: 45, tech: "Data formats", week: 22, topic: "6.1" },
  { id: "L138", name: "Script pulling interface data over SSH", difficulty: "M", minutes: 45, tech: "Python scripting", week: 22, topic: "6.1" },
  { id: "L139", name: "Write an EEM applet on a syslog trigger", difficulty: "E", minutes: 30, tech: "EEM applet", week: 22, topic: "6.2" },
  { id: "L140", name: "Automate a config backup on write", difficulty: "M", minutes: 45, tech: "EEM backup", week: 22, topic: "6.2" },
  { id: "L141", name: "Build a multi-action EEM policy", difficulty: "H", minutes: 60, tech: "EEM policy", week: 22, topic: "6.2" },
  { id: "L142", name: "Make a REST GET with auth headers", difficulty: "E", minutes: 30, tech: "REST GET", week: 22, topic: "6.3" },
  { id: "L143", name: "POST configuration via a REST API", difficulty: "M", minutes: 45, tech: "REST POST", week: 22, topic: "6.3" },
  { id: "L144", name: "Handle status codes and a webhook", difficulty: "M", minutes: 45, tech: "Status codes, webhooks", week: 22, topic: "6.3" },
  { id: "L145", name: "Run an Ansible playbook against a router", difficulty: "E", minutes: 30, tech: "Ansible", week: 23, topic: "6.4" },
  { id: "L146", name: "Template a config with Jinja2", difficulty: "M", minutes: 45, tech: "Jinja2", week: 23, topic: "6.4" },
  { id: "L147", name: "Compare Ansible, Puppet and Chef models", difficulty: "M", minutes: 45, tech: "Config management", week: 23, topic: "6.4" },
  { id: "L148", name: "Authenticate and get a DNA Center token", difficulty: "E", minutes: 30, tech: "DNAC token", week: 23, topic: "6.5" },
  { id: "L149", name: "Call the DNA Center device-inventory API", difficulty: "M", minutes: 45, tech: "DNAC API", week: 23, topic: "6.5" },
  { id: "L150", name: "Authenticate and query the vManage API", difficulty: "M", minutes: 45, tech: "vManage API", week: 23, topic: "6.5" },
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
