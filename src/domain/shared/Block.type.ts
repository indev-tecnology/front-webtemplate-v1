type Block =
  | { type: "heading"; level: 1|2|3; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; style: "ul"|"ol"; items: string[] }
  | { type: "image"; attachmentId: string; alt?: string; caption?: string }
  | { type: "attachment"; attachmentId: string; label?: string }
  | { type: "cta"; label: string; href: string };