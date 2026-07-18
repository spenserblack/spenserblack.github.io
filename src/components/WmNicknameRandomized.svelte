<script lang="ts">
  import { onMount } from "svelte";
  import { coinFlip } from "../scripts/chance";
  import {
    prefix as getPrefix,
    name as createName,
    suffix as getSuffix,
  } from "../scripts/nicknames";

  /**
   * Creates a randomized name getter that has a chance to return null.
   * @param maker The callable that gets a randomized name.
   * @param nullChance If set, this is the chance that the result will be null. Defaults to a 50/50 chance.
   */
  const createOptionalNameMaker =
    (maker: () => string, nullChance?: number) => () =>
      coinFlip(nullChance) ? null : maker();
  const createPrefix = createOptionalNameMaker(getPrefix, 0.25);
  const createSuffix = createOptionalNameMaker(getSuffix);

  const initialName = createName();
  const initialSuffix = createSuffix();
  // NOTE If the suffix is null, guarantee a prefix to ensure that the full nickname is
  //      unique.
  const initialPrefix = initialSuffix == null ? getPrefix() : createPrefix();

  let {
    prefix = $bindable<string | null>(initialPrefix),
    name = $bindable(initialName),
    suffix = $bindable<string | null>(initialSuffix),
  } = $props();

  const setNameDecorators = () => {
    suffix = createSuffix();
    // NOTE If the suffix is null, guarantee a prefix to ensure that the full nickname
    //      is unique.
    if (suffix == null) {
      prefix = getPrefix();
    } else {
      prefix = createPrefix();
    }
  };
  onMount(setNameDecorators);

  const onSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    name = createName();
    setNameDecorators();
  };
</script>

<form id="nickname-form" onsubmit={onSubmit}>
  <p>
    Click the button below to generate your nickname. Feel free to keep clicking
    until you get one you like.
  </p>
  <button type="submit" id="nickname-generate" class="primary"
    >(Re)generate</button
  >
</form>
