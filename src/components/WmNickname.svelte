<script lang="ts">
  import Seeded from "./WmNicknameSeeded.svelte";
  import Randomized from "./WmNicknameRandomized.svelte";

  type Generator = "seeded" | "randomized";
  let generator = $state<Generator>("seeded");

  let prefix = $state<string | null>(null);
  let name = $state<undefined | string>("");
  let suffix = $state<string | null>(null);

  const onSubmit = (e: SubmitEvent): void => {
    e.preventDefault();
  };
</script>

<form id="form-nickname-generator" onsubmit={onSubmit}>
  <div class="option-input">
    <input
      type="radio"
      id="radio-seeded"
      name="generator"
      value="seeded"
      bind:group={generator}
    />
    <label for="radio-seeded">From ID</label>
  </div>
  <div class="option-input">
    <input
      type="radio"
      id="radio-randomized"
      name="generator"
      value="randomized"
      bind:group={generator}
    />
    <label for="radio-randomized">Randomized</label>
  </div>
</form>
{#if generator === "seeded"}
  <Seeded bind:prefix bind:name bind:suffix />
{:else}
  <Randomized bind:prefix bind:name bind:suffix />
{/if}

<p>
  {#if name}
    Your nickname is
    <output for="nickname-generate">
      <strong id="nickname"
        >{#if prefix != null}<u>{prefix}</u>{" "}{/if}<u>{name}</u
        >{#if suffix != null}{" "}<u>{suffix}</u>{/if}</strong
      >
    </output>
  {/if}
</p>
