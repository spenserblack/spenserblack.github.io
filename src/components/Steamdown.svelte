<script lang="ts">
  import { parse, render } from "@steamdown/core";
  import { render as renderHTML } from "@steamdown/html";

  type Output = "markup" | "preview";
  let output = $state<Output>("markup");

  const placeholder = `# Hello, Steam!

This is my review about __SOME GAME__! I like it *a lot!*

Spoiler alert: >!the good guys win!<.`;

  let markdown = $state(placeholder);

  let parsed = $derived(parse(markdown));
  let markup = $derived(render(parsed[0], parsed[1]));
  let html = $derived(renderHTML(parsed[0], parsed[1]));

  const onSubmit = (e: SubmitEvent) => {
    e.preventDefault();
  };
</script>

<form id="steamdown-form" onsubmit={onSubmit}>
  <label for="steamdown-source">Source</label>
  <textarea
    id="steamdown-source"
    name="steamdown-source"
    autocomplete="off"
    autocapitalize="sentences"
    {placeholder}
    spellcheck="true"
    wrap="soft"
    rows="10"
    bind:value={markdown}></textarea>
  <fieldset class="inline">
    <legend>Output style</legend>
    <div class="option-input">
      <input
        type="radio"
        id="radio-markup"
        name="output"
        value="markup"
        bind:group={output}
      />
      <label for="radio-markup">Markup</label>
    </div>
    <div class="option-input">
      <input
        type="radio"
        id="radio-preview"
        name="output"
        value="preview"
        bind:group={output}
      />
      <label for="radio-preview">Preview</label>
    </div>
  </fieldset>
</form>

<h3>Output</h3>
<div id="outputs">
  {#if output === "markup"}
    <output id="output-markup" for="steamdown-source radio-markup">
      <pre id="output-markup-content">{#each markup.split("\n") as line}<code
            >{line}</code
          >{"\n"}{/each}</pre>
    </output>
  {:else}
    <output id="output-preview" for="steamdown-source radio-preview"
      >{@html html}</output
    >
  {/if}
</div>

<style>
  :global {
    .spoiler {
      color: white;
      background-color: white;
    }
    .spoiler:hover {
      color: black;
    }

    :root[data-theme="light"] .spoiler {
      color: black;
      background-color: black;
    }
    :root[data-theme="light"] .spoiler:hover {
      color: white;
    }
    :root[data-theme="dark"] .spoiler {
      color: white;
      background-color: white;
    }
    :root[data-theme="dark"] .spoiler:hover {
      color: black;
    }
    @media (prefers-color-scheme: light) {
      .spoiler {
        color: black;
        background-color: black;
      }
      .spoiler:hover {
        color: white;
      }
    }
  }

  #steamdown-source {
    width: 100%;
    margin: auto;
  }
  #output-markup-content {
    overflow-x: auto;
  }
</style>
