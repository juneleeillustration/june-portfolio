import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title("Content")
    .items([
      // Site settings singleton
      S.listItem()
        .title("Site Settings")
        .icon(() => "⚙️")
        .child(S.document().schemaType("settings").documentId("settings")),
      S.divider(),
      orderableDocumentListDeskItem({
        type: "section",
        title: "Sections (drag to reorder)",
        S,
        context,
      }),
      S.divider(),
      // Remaining document types, excluding singletons handled above.
      ...S.documentTypeListItems().filter((item) => {
        const id = item.getId();
        return id !== "section" && id !== "settings";
      }),
    ]);
