<script lang="ts">
  import { onMount } from "svelte";
  import Random from "rand-seed";
  import { write as writeClipboard } from "../scripts/clipboard";
  import { pickPrefix, pickName, pickSuffix } from "../scripts/nicknames";
  import { getLocationUrl } from "../scripts/url";
  import { uuidV5 } from "../scripts/uuid";
  const idKey = "id";

  const initialSeed = getLocationUrl()?.searchParams.get(idKey) ?? "";

  let {
    prefix = $bindable<string | null>(null),
    name = $bindable(""),
    suffix = $bindable<string | null>(null),
  } = $props();
  let seed = $state(initialSeed);

  const setSeed = (value: string): void => {
    seed = value;
    if (value === "") {
      prefix = null;
      name = "";
      suffix = null;
    } else {
      const seedValue = uuidV5(value);
      const random = new Random(seedValue);
      const rng = () => random.next();

      // NOTE Very simple and naive implementation of chances.
      const dropSuffix = rng() < 0.5;
      const dropPrefix = !dropSuffix && rng() < 0.25;
      prefix = dropPrefix ? null : pickPrefix(rng);
      suffix = dropSuffix ? null : pickSuffix(rng);
      name = pickName(rng);
    }
  };

  let link = $derived.by(() => {
    const url = getLocationUrl();
    if (url == null) {
      return null;
    }
    if (seed) {
      url.searchParams.set("id", seed);
    }
    return url.toString();
  });

  const onSubmit = (e: SubmitEvent): void => {
    e.preventDefault();
  };

  let copyConfirmation = $state(false);
  let copyConfirmationTimeout: number | null = null;
  const copyShareLink = async (): Promise<void> => {
    if (copyConfirmationTimeout != null) {
      clearTimeout(copyConfirmationTimeout);
    }
    await writeClipboard(link ?? "");
    copyConfirmation = true;
    copyConfirmationTimeout = setTimeout(() => {
      copyConfirmation = false;
    }, 750);
  };

  // NOTE Reset nickname on mount to clear out the nickname from the randomized version.
  onMount(() => {
    if (!seed) {
      prefix = null;
      name = "";
      suffix = null;
    } else {
      // TODO This feels like a bit of a hack. Improve?
      setSeed(seed);
    }
  });
</script>

<form id="nickname-form" onsubmit={onSubmit}>
  <p>
    Enter a <em>public</em> identifier (like your name or a
    <abbr title="Decentralized Identifier">DID</abbr>).
    <em>Don't use a private identifier!</em>
  </p>
  <label for="input-seed">ID</label>
  <input
    type="text"
    id="input-seed"
    name="seed"
    bind:value={() => seed, setSeed}
  />
</form>

{#if link != null}
  <p>
    <strong>Share link:</strong> <code>{link}</code> <button type="button" class="primary" onclick={copyShareLink}>Cop{#if copyConfirmation}ied{:else}y{/if}</button>
  </p>
{/if}
