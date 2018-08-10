const PARAGRAPH = `NIH (Not Invented Here) isn’t a 4-letter word. We’re all presumably programmers because we like programming. We shouldn’t have to resign ourselves to the plumbing together of existing, poorly understood software, spending our days to write glue code we hate to produce a Frankenstein, monster system that sucks. We can do noble work and have it address problems from first principles. And that, in turn, makes us better more able engineers in the doing. NIH is a derogatory term for what I think is actually an incredibly important and virtuous impulse that is to invent and to create, to learn by doing. Of course, we have to strike a balance between self-actualizing and getting the job done, but I don’t think we should take inventing something from first principles out of our tool belt kind of reflexively. Sometimes it can be the right thing to do and it can help us grow as professionals and as human beings.`;

new Vue({
    el: '#app',
    data: {
      title: 'Vue Typer',
      originalText: PARAGRAPH,
      typedText: '',
      typoIndex: -1,
      endTypoIndex: -1,
      typoIndexes: [],
      endTypoIndexes: []
    },
    computed: {
        outputHTML: function() {
            let newHTML = '<span class="correct">';
            if(this.typoIndexes.length == 0) {
                // we do not have a typo index
                newHTML += this.originalText.substr(0, this.typedText.length);
                newHTML += '</span>';
                newHTML += this.originalText.substr(this.typedText.length);

                return newHTML;
            }

            newHTML += this.originalText.substr(0, this.typoIndexes[0]);
            var previousErrors = false;

            for(let i = this.typoIndexes[0]; i < this.typedText.length; i++) {
                if((this.originalText[i] == this.typedText[i]) && previousErrors) {
                    newHTML += '</span><span class="correct">';
                    previousErrors = false;
                } else if((this.originalText[i] != this.typedText[i]) && !previousErrors) {
                    newHTML += '</span><span class="typo">';
                    previousErrors = true;
                }
                console.log("i is: " + i);
                newHTML += this.originalText[i];
            }
            newHTML += '</span>';
            newHTML += this.originalText.substr(this.typedText.length);

            return newHTML;
        }
    },
    watch: {
        typedText: function(value) {
            this.typoIndexes = [];
            this.endTypoIndexes = [];
            for(let i = 0; i < value.length; i++) {
                if(value[i] !== this.originalText[i]) {
                    this.typoIndexes.push(i);
                } else if(this.typoIndexes.length > 0 && (i > 0 && value[i-1] !== this.originalText[i-1])) {
                    this.endTypoIndexes.push(i);
                }   
            }
        }
    }
})