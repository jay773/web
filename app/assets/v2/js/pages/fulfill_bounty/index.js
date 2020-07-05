/* eslint-disable no-console */
needWalletConnection();

const fetchFromWeb3Wallet = () => {
  if (!provider) {
    onConnect();
  }
  $('#payoutAddress').val(selectedAccount);
  $('#payoutAddress').attr('readonly', true);
}

window.addEventListener('dataWalletReady', function(e) {
  if (is_bounties_network || web3_type === 'web3_modal') {
    fetchFromWeb3Wallet();
  }
}, false);

window.onload = function() {

  $('.rating input:radio').attr('checked', false);

  $('.rating input').click(function() {
    $('.rating span').removeClass('checked');
    $(this).parent().addClass('checked');
  });

  if (typeof localStorage['githubUsername'] != 'undefined') {
    if (!$('input[name=githubUsername]').val()) {
      $('input[name=githubUsername]').val(localStorage['githubUsername']);
    }
  }
  if (getParam('source')) {
    $('input[name=issueURL]').val(getParam('source'));
  }

  $('#submitBounty').validate({
    submitHandler: function(form) {
      loading_button($('.js-submit'));
      let data = {};

      $.each($(form).serializeArray(), function() {
        data[this.name] = this.value;
      });

      if (is_bounties_network) {
        ethFulfillBounty(data);
      } else {
        fulfillBounty(data);
      }
    }
  });
};

