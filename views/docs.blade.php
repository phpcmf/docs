@extends('flarum.forum::layouts.basic')

@section('title', $title)

@section('content')
<div id="app"></div>
@endsection

@section('js')
<script>
  flarum.core.compat.extend.extend(flarum.core.compat['forum/DocsPage'].prototype, 'content', function(content) {
    return (
      <div className="DocsPage">
        {content()}
      </div>
    );
  });
</script>
@endsection