const rules = [
    [/^#{6}\s?(.*$)/gim, '<h6>$1</h6>'], // ######  ->  <h6>
    [/^#{5}\s?(.*$)/gim, '<h5>$1</h5>'], // #####  ->  <h5>
    [/^#{4}\s?(.*$)/gim, '<h4>$1</h4>'], // ####  ->  <h4>
    [/^#{3}\s?(.*$)/gim, '<h3>$1</h3>'], // ###  ->  <h3>
    [/^#{2}\s?(.*$)/gim, '<h2>$1</h2>'], // ##  ->  <h2>
    [/^#{1}\s?(.*$)/gim, '<h1>$1</h1>'], // #  ->  <h1>
    [/(\*\*|__)(.*)(\*\*|__)/gim, '<b>$1</b>'], // ** X ** | __ X __ ->   <b>
    [/(\*|_)(.*)(\*|_)/gim, '<i>$1</i>'], // * X * | _ X _ ->   <i>
    // [/((\n\d\..+)+)/g, '<ol>$1</ol>'],
    // [/((\n\*.+)+)/g, '<ul>$1</ul>'],
    // [/\n\d\.([^\n]+)/g, '<li>$1</li>'],
    // [/^\*([^\n]+)/g, '<li>$1</li>'],
    // [/^(\*|\+|-) .*$/g, '<li>$1</li>'],
    [/!\[(.*?)\]\((.*?)\)/gim, "<img alt='$1' src='$2' />"],  // ![]()  ->   <img>
    [/\[(.*?)\]\((.*?)\)/gim,  "<a href='$2' target='_blank'>$1</a>"],  // []()  ->   <a>
    [/^\> (.*$)/gim, '<blockquote>$1</blockquote>'],  //  > X   ->   <blockquote>
    //[/\n$/gim, '<br />'],
    [/([^\n]+\n)/g, '<p>$1</p>'],          //  \n -> <p>
];

export default {
    mounted(el) {
        let html = el.textContent;
        console.log(html);
        rules.forEach(([rule, template]) =>  {
            html = html.replace(rule, template);
        })
        console.log(html);

        el.innerHTML = html.trim();
      }
}