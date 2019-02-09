export default {
  methods: {
    pmUser (user) {
      if (user.id === this.$parent.auth.id) {
        return false
      }
      swal({
        title: `Send Private Message to ${user.username}`,
        width: '800px',
        height: '600px',
        inputAttributes: {
          autocapitalize: 'off'
        },
        html:
            '<div class="text-left">'+
            '<input type="hidden" id="receiver-id" name="receiver-id" value="'+user.id+'">\n' +
            '<textarea id="chat-message-pm"\n' +
            '        name="message-pm"\n' +
            '        placeholder="Write your message..."\n' +
            '        cols="30"\n' +
            '        rows="5">\n' +
            '</textarea>'+
            '</div>',
        showCancelButton: true,
        confirmButtonText: 'Send',
        showLoaderOnConfirm: true,
        onOpen: () => {
          this.editor = $('#chat-message-pm').wysibb()
          this.target = $('#receiver-id').val();
        },
        onClose: () => {
          this.editor = null;
          this.target = null;
        },
        preConfirm: (msg) => {
          let target = this.target;
          msg = this.editor.bbcode().trim();
          if (msg !== null && msg !== '') {
            this.$emit('pm-sent', {
              message: msg,
              save: true,
              user_id: this.$parent.auth.id,
              receiver_id: target
            });
            $('#chat-message-pm').html('');
          }
          return user;
        },
        allowOutsideClick: false
      }).then(result => {
        if (result.value) {
          swal({
            title: `Sent Private Message to ${result.value.username}`,
            timer: 1500,
            onOpen: () => {
              swal.showLoading();
            }
          }).then((result) => {
            if (result.dismiss === swal.DismissReason.timer) {

            }
          })
        }
      })
    },
  }
}