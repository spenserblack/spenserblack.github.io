<script lang="ts">
  import { onMount } from "svelte";
  import { prefixes, names, suffixes } from "../scripts/nicknames";
  import { uuidV5 } from "../scripts/uuid";

  let {
    prefix = $bindable<string | null>(null),
    name = $bindable(""),
    suffix = $bindable<string | null>(null),
  } = $props();
  let seed = $state("");

  /**
   * Limits an unbound index to the length of the given array, returning the indexed value.
   */
  const arrGetBound = <T,>(arr: T[], unbound: number): T =>
    arr[unbound % arr.length];

  const setSeed = (value: string): void => {
    seed = value;
    if (value === "") {
      prefix = null;
      name = "";
      suffix = null;
    } else {
      const buffer = uuidV5(value, true);

      // NOTE Naive implementation of transforming a UUID into a single numerical value.
      const hash = buffer.reduce((hash, b) => ((hash << 8) | b) % 0xfffff, 0);

      // NOTE Very simple and naive implementation of chances.
      suffix = hash % 2 === 0 ? null : arrGetBound(suffixes, hash);
      prefix =
        hash % 4 === 0 && suffix != null ? null : arrGetBound(prefixes, hash);
      name = arrGetBound(names, hash);
    }
  };

  const onSubmit = (e: SubmitEvent): void => {
    e.preventDefault();
  };

  // NOTE Reset nickname on mount to clear out the nickname from the randomized version.
  onMount(() => {
    prefix = null;
    name = "";
    suffix = null;
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
