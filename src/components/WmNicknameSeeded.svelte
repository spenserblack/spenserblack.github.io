<script lang="ts">
  import { onMount } from "svelte";
  import Random from "rand-seed";
  import { pickPrefix, pickName, pickSuffix } from "../scripts/nicknames";
  import { uuidV5 } from "../scripts/uuid";

  let {
    prefix = $bindable<string | null>(null),
    name = $bindable(""),
    suffix = $bindable<string | null>(null),
  } = $props();
  let seed = $state("");

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
