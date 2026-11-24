import type { StructureResolver } from "sanity/structure";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import { CogIcon } from "@sanity/icons/Cog";
import { DocumentVideoIcon } from "@sanity/icons/DocumentVideo";
import { ImagesIcon } from "@sanity/icons/Images";
import { UsersIcon } from "@sanity/icons/Users";

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title("Website")
    .items([
      S.listItem()
        .title("Site settings & About Me")
        .id("settings")
        .icon(CogIcon)
        .child(S.document().schemaType("settings").documentId("settings").title("Site settings & About Me")),
      S.divider(),
      orderableDocumentListDeskItem({
        type: "project",
        id: "fashion-projects",
        title: "Personal: Fashion",
        icon: ImagesIcon,
        filter: 'category == "fashion"',
        createIntent: false,
        S,
        context,
      }),
      orderableDocumentListDeskItem({
        type: "project",
        id: "anthropological-projects",
        title: "Personal: Anthropological Perspectives",
        icon: ImagesIcon,
        filter: 'category == "anthropological"',
        createIntent: false,
        S,
        context,
      }),
      orderableDocumentListDeskItem({
        type: "film",
        title: "Personal: Videos",
        icon: DocumentVideoIcon,
        S,
        context,
      }),
      orderableDocumentListDeskItem({
        type: "client",
        title: "Selected Clients & Publications",
        icon: UsersIcon,
        S,
        context,
      }),
    ]);
