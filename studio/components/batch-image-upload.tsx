import { useRef, useState, type ChangeEvent } from "react";
import { insert, setIfMissing, useClient, type ArrayOfObjectsInputProps } from "sanity";
import { Button, Flex, Stack, Text } from "@sanity/ui";
import { UploadIcon } from "@sanity/icons/Upload";

const batchSize = 5;

const uniqueKey = () => Math.random().toString(36).slice(2, 12);

export function BatchImageUpload(props: ArrayOfObjectsInputProps) {
  const client = useClient({ apiVersion: "2025-02-19" });
  const fileInput = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(null);

  async function upload(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    event.target.value = "";
    if (files.length === 0) return;

    props.onChange(setIfMissing([]));
    setProgress({ done: 0, total: files.length });

    for (let start = 0; start < files.length; start += batchSize) {
      const slice = files.slice(start, start + batchSize);
      const assets = await Promise.all(
        slice.map((file) => client.assets.upload("image", file, { filename: file.name })),
      );
      const items = assets.map((asset) => ({
        _type: "image",
        _key: uniqueKey(),
        asset: { _type: "reference", _ref: asset._id },
      }));
      props.onChange(insert(items, "after", [-1]));
      setProgress({ done: Math.min(start + batchSize, files.length), total: files.length });
    }

    setProgress(null);
  }

  return (
    <Stack gap={3}>
      {props.renderDefault(props)}
      <Flex align="center" gap={3}>
        <Button
          icon={UploadIcon}
          mode="ghost"
          text="Upload several images"
          disabled={progress !== null || props.readOnly}
          onClick={() => fileInput.current?.click()}
        />
        {progress ? (
          <Text size={1} muted>
            Uploading {progress.done} / {progress.total}…
          </Text>
        ) : null}
      </Flex>
      <input ref={fileInput} type="file" accept="image/*" multiple hidden onChange={upload} />
    </Stack>
  );
}
