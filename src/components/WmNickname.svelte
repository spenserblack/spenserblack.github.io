<script lang="ts">
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

  let prefix = $state<string | null>(null);
  let name = $state(createName());
  let suffix = $state<string | null>(null);

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
  setNameDecorators();

  const onSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    name = createName();
    setNameDecorators();
  };
</script>

<form id="nickname-form" onsubmit={onSubmit}>
  <button type="submit" id="nickname-generate" class="primary"
    >(Re)generate</button
  >
</form>

<output for="nickname-generate">
  <p>
    <strong id="nickname"
      >{#if prefix != null}<u>{prefix}</u>{" "}{/if}<u>{name}</u
      >{#if suffix != null}{" "}<u>{suffix}</u>{/if}</strong
    >
  </p>
</output>
